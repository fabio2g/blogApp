/**
 * --------------------
 * Configuração express
 * --------------------
 */
const express = require("express");
const app = express();
const PORT = 3000;

/**
 * ------------------------------------------
 * Configuração do template engine handlebars
 * ------------------------------------------
 */
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/**
 * ---------------------------
 * Configuração do Body-Parser
 * ---------------------------
 */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * ----------------------------------
 * Configuração de arquivos estáticos
 * ----------------------------------
 */
app.use(express.static(__dirname + "/public"));

/**
 * ---------------------
 * Configuração de rotas
 * ---------------------
 */
const admin = require("../routes/admin");
app.use("/admin", admin);

module.exports = {
    express: express,
    app: app,
    port: PORT,
    handlebars: handlebars,
    bodyParser: bodyParser,
};
