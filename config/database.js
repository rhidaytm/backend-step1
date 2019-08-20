const Sequelize = require("sequelize");

const sequelize = new Sequelize("nations_qtha", "root", "", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;