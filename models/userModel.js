const { pool } = require("../config/db");

const getUserByEmail = async (email) => {
  const db = await pool;
  const result = await db.request()
    .input("email", email)
    .query("SELECT * FROM Users WHERE email = @email");

  return result.recordset[0];
};

const createUser = async (email, password) => {
  const db = await pool;
  await db.request()
    .input("email", email)
    .input("password", password)
    .query("INSERT INTO Users (email, password) VALUES (@email, @password)");
};

module.exports = { getUserByEmail, createUser };