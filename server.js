const express = require("express");
const oracledb = require("oracledb");
const bodyParser = require("body-parser");
const cors = require("cors");

oracledb.autoCommit = true;

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true,
}));

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
    res.status(500).json({ success: false, message: "회원가입에 실패했습니다." });
  }
  
});

//오늘의 경제단어에서 필요한 데이터(뿌려주기)
app.post('/today_words_data', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute('SELECT * FROM today_words');
    const data = result.rows;

    // 연결 해제
    await connection.close();

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//저장한 단어장 데이터
app.post('/save_wordlist', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute('SELECT * FROM wordlist');
    const data = result.rows;

    await connection.close();

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/save_wordlist', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute('SELECT * FROM wordlist');
    const data = result.rows;

    await connection.close();

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/today_words_data', async (req, res) => {
  try {
    const connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute('SELECT * FROM today_words');
    const data = result.rows;

    await connection.close();

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`localhost:${port}`);
  initConnectionPool().catch((error) => {
    console.error(error);
  });
});
