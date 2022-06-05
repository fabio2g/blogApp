const Sequelize = require("sequelize");
const sequelize = new Sequelize("sistemacadastro", "root", "admin", {
    host: "localhost",
    dialect: "mysql",
});

export { Sequelize, sequelize };
