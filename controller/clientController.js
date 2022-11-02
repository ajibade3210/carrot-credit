const Client = require("../models/Client");
const getObjKey = require("../config/helper")

exports.getAllClients = async (req, res, next) => {
    try {
        const [col, _] = await Client.findAll();
        res.status(200).json({
            success: true,
            count: col.length,
            clients: col
         });
    }catch(error){
      res.status(401).send(error.message)
        console.log(error);
        next(error);
    }
}

exports.createNewClient = async (req, res, next) => {
    try {
        const { firstname, lastname, amount, accountType } = req.body;
        let client = new Client(firstname, lastname, amount, accountType);
        client = client.save();
        res.status(201).json({success: true, message: "Client Created"});
    }catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getClientById = async (req, res, next) => {
    try {
        let id = req.params.id;
        let [col, _] = await Client.findById(id);
      const amount = getObjKey(col);
      let clients = {
          ...col[0],
          ...amount
      }
      res.status(200).json({ success: true, clients });
    } catch (error) {
      console.log(error);
      next(error);
    }
};

exports.credit = async (req, res, next) => {
    try {
      let { credit } = req.body;
      let id = req.params.id;
      await Client.findByIdAndCredit(id, credit);

      let [col, _] = await Client.findById(id);
      res.status(201).json({
        success: true,
        clients: col[0],
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
};

exports.debit = async (req, res, next) => {
    try {
      let { debit } = req.body;
      let id = req.params.id;
      let [col, _] = await Client.findById(id);
      const amount = getObjKey(col);

      // Check Current Funds
      if (debit > amount.fund) {
        return res.status(401).json({
          success: true,
          message: `${col[0].firstname} ${col[0].lastname} has insufficient balance`,
        });
      }

      await Client.findByIdAndDebit(id, debit, amount.key, amount.fund);
      res.status(201).json({
        success: true,
        clients: col[0],
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
};
