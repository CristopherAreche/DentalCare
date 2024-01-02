const { Sequelize } = require("sequelize");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config({
//   path: path.resolve(__dirname, "../../.env"),
// });

const sequelize = new Sequelize("dental_care_db", "cristopher", "12345", {
  host: "127.0.0.1",
  port: 5438,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
