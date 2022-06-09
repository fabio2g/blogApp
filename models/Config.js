/**
 * --------------------
 * Configuração Express
 * --------------------
 */
const Express = require("express");
const App = Express();
const PORT = 3000;
/**
 * ----------------------------------
 * Configuração de arquivos estáticos
 * ----------------------------------
 */
App.use("/assets/css", Express.static(__dirname + "/css"));
App.use("/assets/js", Express.static(__dirname + "/js"));
/**
 * ---------------------------
 * Configuração do Body-Parser
 * ---------------------------
 */
const BodyParser = require("body-parser");
App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());
/**
 * ------------------------------------------
 * Configuração do template engine Handlebars
 * ------------------------------------------
 */
const Handlebars = require("express-handlebars");
App.engine("handlebars", Handlebars.engine({ defaultLayout: "main" }));
App.set("view engine", "handlebars");
/**
 * ------------------------
 * Configuração do Mongoose
 * ------------------------
 */
const Mongoose = require("mongoose");

module.exports = {
    app: App,
    port: PORT,
    bodyParser: BodyParser,
    handlebars: Handlebars,
    mongoose: Mongoose,
};
