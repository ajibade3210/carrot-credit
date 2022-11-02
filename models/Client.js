const db = require('../config/db');
const getObjKey = require('../config/helper');

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
            INSERT INTO client(
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
    let sql = "SELECT * FROM client";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM client WHERE id = ${id};`;
    return db.execute(sql);
  }

  static findByIdAndUpdate(id, firstname, lastname, amount, accountType) {
    let sql = `UPDATE client
       set  firstname=${firstname},
       lastname=${lastname},
       amount=${amount},
       account_id=${accountType},
       WHERE id = ${id};
       `;
    return db.execute(sql);
  }

  static async findByIdAndCredit(id, credit) {
    let [col, _] = await this.findById(id);
    const {fund,key} = getObjKey(col);
    const currentAmount = fund + credit;
    let sql = `UPDATE client SET amount = JSON_SET(amount, '$.${key}',${currentAmount}) WHERE id = ${id};`;
    return db.execute(sql);
  }

  static async findByIdAndDebit(id, debit,key, fund) {
    const currentAmount = fund - debit;
    let sql = `UPDATE client SET amount = JSON_SET(amount, '$.${key}',${currentAmount}) WHERE id = ${id};`;
    return db.execute(sql);
  }
}

module.exports = Client;
