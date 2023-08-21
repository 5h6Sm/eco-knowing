const express = require('express');
const oracledb = require('oracledb');

const app = express();
const port = 3000;

// Oracle Database Connection Pool 설정
async function initConnectionPool() {
  await oracledb.createPool({
    user: 'SOOMIN',
    password: '3308',
    connectString: 'localhost:1521',
    poolMax: 10,
    poolMin: 2,
    poolIncrement: 2,
    poolTimeout: 5,
  });
}

// app.get('/api/data', async (req, res) => {
//   const { id, pw } = req.body;
//   console.log(id, pw);
//     try {
//       const connection = await oracledb.getConnection();
//       const result = await connection.execute('SELECT * FROM USERS');
//       await connection.close();
//       res.json(result.rows);
//     } catch (error) {
//       console.error('Error retrieving data:', error);
//       res.status(500).json({ error: 'An error occurred while retrieving data.', details: error.message });
//     }
//   });

  app.post('/api/data', async (req, res) => {
    const { id, pw } = req.body;
    const connection = await oracledb.getConnection();
    console.log(id, pw);
  
    try {
      const result = await connection.execute(
        'SELECT * FROM USERS WHERE ID = :username AND PW = :pw',
        [id, pw]
      );
  
      if (result.rows.length > 0) {
        res.json({ success: true, user: result.rows[0] });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login.' });
    } finally {
      await connection.close();
    }
  });

  app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  
  
  // 서버 시작
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    initConnectionPool().catch(error => {
      console.error('Error initializing database connection pool:', error);
    });
  });