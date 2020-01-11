const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/db");
//load env vars
dotenv.config({ path: "./config/config.env" });

//init express
const app = express();
const PORT = process.env.PORT || 5000;

//connect to db;
connectDb();


//set static folder
app.use(express.static(path.join(__dirname,'public')))

//body parser
app.use(cors());
app.use(express.json());
app.use("/api/v1/stores", require("./routes/stores"));

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} PORT=${PORT}`);
});
