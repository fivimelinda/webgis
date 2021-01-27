const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres", //MASUKKAN NAMA USER POSTGRESQL
  host: "localhost", //MASUKKAN HOST
  database: "gisdb", //MASUKKAN NAMA DATABASE
  password: "password", //MASUKKAN PASSWORD
  port: 5432, //MASUKKAN PORT YANG DIGUNAKAN DATABASE
});

exports.pool = pool;
