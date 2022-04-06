const Sequelize = require("sequelize");

const db = new Sequelize("westsidenode", "root", "umaushan", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = db;