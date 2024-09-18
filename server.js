const bodyParser = require("body-parser");
const app = require("./app");
const mongoose = require("mongoose");
const utils = require("./utils");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const port = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MOGOURL)
  .then(console.log("data base is connected")).then(()=> utils.checkCollectionExists([2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024]))
  .catch((erorr) => {
    console.log(erorr);
  });
 

app.listen(port, () => {
  console.log(`server runs on port ${port}`);
});