const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Routes = require("./routes/index");
const ConnectDB = require("./config");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", Routes);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(PORT, "0.0.0.0", () => {
  ConnectDB();
  console.log(`Server running on port ${PORT}`);
});
