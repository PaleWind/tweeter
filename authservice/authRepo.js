import PG from "pg";
const Pool = PG.Pool;
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.PGUSER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});
// console.log(/pool);

const getUser = async (username) => {
  try {
    let getUserQuery = "SELECT * FROM users.users WHERE username = $1";
    let res = await pool.query(getUserQuery, [username]);
    console.log("getUser: ", res.rows[0]);
    return res.rows[0];
  } catch (error) {
    return error.stack;
  }
};

const registerUser = async (username, password) => {
  try {
    let insertUserQuery =
      "INSERT INTO users.users (username, password) VALUES ($1, $2) RETURNING *";
    let res = await pool.query(insertUserQuery, [username, password]);
    console.log("insertUserQuery: ", res.rows[0]);
    return res.rows[0];
  } catch (error) {
    return error.stack;
  }
};

export const authRepo = { getUser, registerUser };
