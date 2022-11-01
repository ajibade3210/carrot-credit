const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});


db.connect(function (err) {
  if (err) throw err;
  db.query("CREATE DATABASE if not exists ExampleDB", function (err, result) {
    if (err) throw err;
    console.log("ExampleDB database created");
  });

  db.query(
    `create table if not exists ExampleDB.Client ( id int auto_increment primary key, firstname VARCHAR(255) not null, lastname VARCHAR(255) not null, amount INT not null, accountType VARCHAR(255), createdAt DATE not null)`,
    function (err, result) {
      if (err) throw err;
      console.log("Client table created");
    }
  );

  console.log("Database Connected!");
});

module.exports = db.promise();
