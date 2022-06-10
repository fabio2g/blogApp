/**
 * --------------------
 * Configuração express
 * --------------------
 */
const express = require("express");
const app = express();
const PORT = 3000;

/**
 * ---------------------------
 * Configuração do Body-Parser
 * ---------------------------
 */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * ------------------------------------------
 * Configuração do template engine handlebars
 * ------------------------------------------
 */
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/**
 * ------------------------
 * Configuração do Mongoose
 * ------------------------
 */
const Mongoose = require("mongoose");

module.exports = {
    express: express,
    app: app,
    port: PORT,
    bodyParser: bodyParser,
    handlebars: handlebars,
    mongoose: Mongoose,
};
