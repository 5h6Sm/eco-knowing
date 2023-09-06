const express = require("express");
const oracledb = require("oracledb");
const bodyParser = require("body-parser");
const cors = require("cors");

oracledb.autoCommit = true;

const app = express();
const port = 3000;

app.use(bodyParser.json());

const allowedOrigins = ["http://localhost:8081"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//DB 연결
const dbConfig = {
  user: "SOOMIN",
  password: "3308",
  connectString: "localhost:1521",
};

async function initConnectionPool() {
  await oracledb.createPool({
    user: dbConfig.user,
    password: dbConfig.password,
    connectString: dbConfig.connectString,
  });
}

//로그인 페이지에 필요한 데이터
app.post("/login_data", async (req, res) => {
  const { id, pw } = req.body;

  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      "SELECT * FROM users WHERE ID = :id AND PW = :pw",
      [id, pw]
    );

    await connection.close();

    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ error: "에러가 나다...." });
  }
});

//회원가입 페이지에 필요한 데이터
app.post("/signup_data", async (req, res) => {
  const { user_name, id, pw, age } = req.body;

  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      "INSERT INTO USERS (ID, NAME, AGE, PW) VALUES (:id, :name, :age, :pw)",
      [id, user_name, age, pw]
    );
    await connection.commit(); // 커밋!!

    await connection.close();

    console.log("회원가입 성공:", result);
    res.json({ success: true, message: "회원가입에 성공했습니다." });
  } catch (error) {
    console.error("회원가입 실패:", error);
    res
      .status(500)
      .json({ success: false, message: "회원가입에 실패했습니다." });
  }
});

app.get("/today_words_data", async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute("SELECT * FROM today_words");
    const data = result.rows;

    await connection.close();

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "500 에러" });
  }
});

//사용자마다 저장한 단어장 불러오기
app.post("/save_wordlist", async (req, res) => {
  const { words, id } = req.body;

  console.log("post : ", words, id);

  try {
    if (!id || !words) {
      return res.status(400).json({ error: "잘못된 데이터 입력" });
    }

    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute("SELECT * FROM wordlist");
    const allRows = result.rows;

    await connection.close();

    const data = [];
    for (let i = 0; i < allRows.length; i++) {
      // console.log("i : ", i);
      for (let j = 0; j < words.length; j++) {
        if (allRows[i][0] == words[j]) {
          // console.log(allRows[i][0], words[j]);
          data.push(allRows[i]);
        }
      }
    }
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "500 에러" });
  }
});


app.get("/save_wordlist", async (req, res) => {
  const { id, words } = req.query; // 쿼리 파라미터로 받기
  console.log(words);
  try {
    if (!id) {
      return res.status(400).json({ error: "잘못된 데이터 입력" });
    }

    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute("SELECT * FROM wordlist");
    const allRows = result.rows;
    await connection.close();

    // const filteredWords = allRows.filter(row => words.includes(row[0])); // words에 해당하는 단어들만 필터링

    res.json(allRows);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "500 에러" });
  }
});

// 클라이언트로부터 받은 단어와 의미를 DB에 저장하고 새로운 테이블 생성
app.post("/create_wordlist", async (req, res) => {
  const { title, wordlist, userId } = req.body;

  try {
    if (!title || !wordlist) {
      return res.status(400).json({ error: "잘못된 데이터 입력" });
    }

    const connection = await oracledb.getConnection(dbConfig);

    // wordlist 테이블에 새로운 레코드 삽입
    const insertWordlistQuery = `
      INSERT INTO wordlist (word) VALUES (:title)
    `;
    await connection.execute(insertWordlistQuery, { title });

    const listIdQuery = `SELECT list_id FROM wordlist WHERE word = :title`;
    const listIdResult = await connection.execute(listIdQuery, [title]);
    const listId = listIdResult.rows[0][0];

    const createTableQuery = `
      CREATE TABLE list_${listId} (
        WORD NVARCHAR2(100) PRIMARY KEY,
        MEAN VARCHAR2(500)
      )
    `;
    await connection.execute(createTableQuery);

    // words 테이블에 단어와 의미 삽입
    const insertWordsQuery = `
      INSERT INTO list_${listId} (WORD, MEAN)
      VALUES (:word, :mean)
    `;
    for (const wordItem of wordlist) {
      await connection.execute(insertWordsQuery, {
        word: wordItem.word,
        mean: wordItem.mean,
      });
    }

    await connection.execute("COMMIT");

    // user 테이블의 saved_wordlist 업데이트
    const updateUserQuery = `
      UPDATE users SET saved_wordlist = saved_wordlist || ', ' || :listId WHERE ID = :userId
    `;

    const findLastListIdQuery = `SELECT MAX(LIST_ID) FROM WORDLIST`;
    const findLastListIdQueryResult = await connection.execute(findLastListIdQuery);
    const findLastListIdQueryResultFinal = findLastListIdQueryResult.rows;

    await connection.execute(updateUserQuery, {
      listId: findLastListIdQueryResultFinal[0][0], 
      userId: userId,
    });

    await connection.close();

    res.json({ success: true, message: "단어장 생성 및 저장에 성공했습니다." });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({ error: "500 에러" });
  }
});


app.get("/study/:listId", async (req, res) => {
  const listId = req.params.listId;
  console.log("list id : " ,listId);

  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(`SELECT * FROM list_${listId}`);
    const data = result.rows;

    await connection.close();
    console.log(data);

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "500 에러" });
  }
});

app.delete("/delete_wordlist/:listId", async (req, res) => {
  const listId = req.params.listId;
  const userId = req.body.userId;

  console.log(listId);

  try {
    const connection = await oracledb.getConnection(dbConfig);

    // 리스트 테이블 삭제
    const dropTableQuery = `
      DROP TABLE list_${listId}
    `;
    await connection.execute(dropTableQuery);
    await connection.execute("COMMIT");


    // wordlist 테이블에서 레코드 삭제
    const deleteWordlistQuery = `
      DELETE FROM wordlist WHERE list_id = :listId
    `;
    await connection.execute(deleteWordlistQuery, { listId });
    await connection.execute("COMMIT");


    // 사용자의 saved_wordlist 업데이트
    const updateUserQuery = `
      UPDATE users SET saved_wordlist = REPLACE(saved_wordlist, ', ' || :listId, '') WHERE ID = :userId
    `;
    await connection.execute(updateUserQuery, { listId, userId });

    await connection.execute("COMMIT");

    await connection.close();

    res.json({ success: true, message: "단어장 삭제 및 업데이트에 성공했습니다." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "500 에러" });
  }
});

app.get("/combined-queries-api-endpoint", async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    // 뷰 결과 조회
    const AgeUnderQuery = `
      CREATE OR REPLACE VIEW AgeUnder20 AS
      SELECT
          U.ID  USER_ID,
          U.NAME  USER_NAME,
          U.AGE  USER_AGE,
          COUNT(L.WORD) LIST_1_WORD_COUNT
      FROM
          USERS U
          LEFT JOIN WORDLIST W ON U.SAVED_WORDLIST LIKE '%' || W.LIST_ID || '%'
          LEFT JOIN LIST_1 L ON W.WORD = L.WORD
      GROUP BY
          U.ID, U.NAME, U.AGE
    `;
    
    // AgeUnder20 뷰 생성
    await connection.execute(AgeUnderQuery);

    //  행 수
    const wordlistViewRowCountQuery = `
      SELECT COUNT(*) ROW_COUNT
      FROM Wordlist_View
    `;
    const wordlistViewRowCountResult = await connection.execute(
      wordlistViewRowCountQuery
    );

    const AgeUnderCount = `
      SELECT COUNT(*) AgeUnderCount
      FROM AgeUnder20
      WHERE USER_AGE < 20
    `;
    const ageUnderCountResult = await connection.execute(AgeUnderCount);

    const users = `SELECT ID FROM USERS`;
    const usersResult = await connection.execute(users);

    const name = `SELECT name FROM USERS`;
    const nameResult = await connection.execute(name);

    console.log(ageUnderCountResult.rows[0]);

    res.json({
      wordlistViewRowCount: wordlistViewRowCountResult.rows[0],
      ageUnderCount: ageUnderCountResult.rows[0],
      users: usersResult,
      name: nameResult,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "500 에러" });
  }
});



app.listen(port, () => {
  console.log(`localhost:${port}`);
  initConnectionPool().catch((error) => {
    console.error(error);
  });
});
