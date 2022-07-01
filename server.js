const fs = require("fs");
const express = require("express");
const app = express();
const routes = require("./routes/routes");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Listening of port of : ${process.env.PORT} on localhost ${process.env.URL}${process.env.PORT}`);
});
