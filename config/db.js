const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


db.connect(function (err) {
  db.query(
    `create table if not exists Client ( id int auto_increment primary key, firstname VARCHAR(255) not null, lastname VARCHAR(255) not null, amount INT not null, accountType VARCHAR(255), createdAt DATE not null)`,
    function (err, result) {
      // if (err) throw err;
      console.log("Client table created");
    }
  );
db.end();
  console.log("Database Connected!");
});

module.exports = db.promise();
