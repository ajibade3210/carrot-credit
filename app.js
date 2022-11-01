const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
// Middleware
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json("@Carrot Credit Banking");
});

// Redirect requests to endpoint starting with /clients
app.use("/clients", require("./routes/clients.routes"));

// Global Erro Handler...
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);
  res.status(500).json({
    message: "Something Went Really Wrong"
  })
})

// Not found route
app.use((req, res) => {
  return res.status(404).send({ success: false, message: "Route not found" });
});

// Listen To Server via Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
