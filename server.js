const express = require("express");
const oracledb = require("oracledb");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.post("/signup_data", async (req, res) => {
  const { user_name, id, pw, age } = req.body;

  try {
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      "INSERT INTO USERS (ID, NAME, AGE, PW) VALUES (:id, :name, :age, :pw)",
      [id, user_name, age, pw]
    );
    await connection.commit(); // 커밋 추가
    await connection.close();
  
    console.log("회원가입 성공:", result);
    res.json({ success: true, message: "회원가입에 성공했습니다." });
  } catch (error) {
    console.error("회원가입 실패:", error);
    res.status(500).json({ success: false, message: "회원가입에 실패했습니다." });
  }
  
});


app.listen(port, () => {
  console.log(`localhost:${port}`);
  initConnectionPool().catch((error) => {
    console.error(error);
  });
});
