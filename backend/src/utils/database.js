const Sequelize = require("sequelize");

const sequelize = new Sequelize("dental_care_db", "cristopher", "12345", {
  host: "127.0.0.1",
  port: 5438,
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
