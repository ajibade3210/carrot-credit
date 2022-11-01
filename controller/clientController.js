const Client = require("../models/Client");


exports.getAllClients = async (req, res, next) => {
    try {
        const [clients, _] = await Client.findAll();
        res.status(200).json({
            success: true,
            count: clients.length,
            clients
         });
    }catch(error){
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
        let [client, _] = await Client.findById(id);
      res.status(200).json({ success: true, clients: client[0] });
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

      let [client, _] = await Client.findById(id);
      res.status(201).json({
        success: true,
        clients:client[0]
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
        let [client, _] = await Client.findById(id);

        // Check Current Funds
        if(debit > client[0].amount) {
            return res.status(401).json({
              success: true,
              message: `${client[0].firstname} ${client[0].lastname} has insufficient balance`,
            });
        }

        await Client.findByIdAndDebit(id, debit);

        res.status(201).json({
        success: true,
        clients: client[0],
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
};
