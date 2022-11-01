const express = require("express");
const clientController = require("../controller/clientController");
const router = express.Router();

// @route GET && POST
router.route("/")
.get(clientController.getAllClients)
.post(clientController.createNewClient);

router.route("/:id")
.get(clientController.getClientById);

router.route("/credit/:id")
.put(clientController.credit);

router.route("/debit/:id")
.put(clientController.debit);

module.exports = router;