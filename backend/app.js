const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./Route/index");
require("dotenv").config();
const port = process.env.PORT || 5000; // Port number for the server
const hostname = "localhost";

const ATLASDb_URL = process.env.DATABASE_URL; // MongoDB Atlas connection string

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  OptionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/", route);

mongoose
  .connect(ATLASDb_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then((res) => {
    app.listen(port, hostname, () => {
      console.log(`Server is running at ${hostname}: ${port}`);
    });
  })
  .catch((err) => console.log(err));
