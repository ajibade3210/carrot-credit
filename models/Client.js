const db = require('../config/db');

class Client {
  constructor(firstname, lastname, amount, accountType) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.amount = amount;
    this.accountType = accountType;
  }

  async save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;
    let sql = `
            INSERT INTO ExampleDB.client(
                firstname,
                lastname,
                amount,
                createdAt,
                accountType
            )
            VALUES(
                '${this.firstname}',
                '${this.lastname}',
                '${this.amount}',
                '${createdAtDate}',
                '${this.accountType}'
            )
        `;

    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM ExampleDB.client";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM ExampleDB.client WHERE id = ${id};`;
    return db.execute(sql);
  }

  static findByIdAndUpdate(id, firstname, lastname, amount, accountType) {
    let sql = `UPDATE ExampleDB.client
       set  firstname=${firstname},
       lastname=${lastname},
       amount=${amount},
       account_id=${accountType},
       WHERE id = ${id};
       `;
    return db.execute(sql);
  }

  static findByIdAndCredit(id, credit) {
    let sql = `UPDATE ExampleDB.client SET amount=amount+${credit} WHERE id = ${id};`;
    return db.execute(sql);
  }

  static findByIdAndDebit(id, add) {
    let sql = `UPDATE ExampleDB.client SET amount=amount - ${add} WHERE id = ${id};`;
    return db.execute(sql);
  }
}

module.exports = Client;
