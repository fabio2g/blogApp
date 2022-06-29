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
 * ------------------------
 * Concfiguração do mongodb
 * ------------------------
 */
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://localhost/blogapp")
    .then(() => {
        console.log("[mongoose] conectado");
    })
    .catch((err) => {
        console.log("[mongoose] " + err);
    });

/**
 * -----------------------
 * Configuração do Session
 * -----------------------
 */
const session = require("express-session");
app.use(
    session({
        secret: "curso de node",
        resave: true,
        saveUninitialized: true,
    })
);

/**
 * ---------------------
 * Configuração do Flash
 * ---------------------
 */
const flash = require("connect-flash");
app.use(flash());

/**
 * --------------------------
 * Configuração de Middleware
 * --------------------------
 */
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

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
