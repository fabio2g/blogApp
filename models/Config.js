/**
 * --------------------
 * Configuração Express
 * --------------------
 */
const Express = require("express");
const App = Express();
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
    PORT: 3000,
    bodyParser: BodyParser,
    handlebars: Handlebars,
    mongoose: Mongoose,
};
