const express = require("express");
const app = express();
const port = "3000";

// Template Engine
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Bando de Dados
const Sequelize = require("sequelize");
const sequelize = new Sequelize("sistemacadastro", "root", "admin", {
    host: "localhost",
    dialect: "mysql",
});

// Rotas
app.get("/cad", (req, res) => {
    res.render("formulario");
});

app.post("/add", (req, res) => {
    res.send('Formulário recebido.')
})

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});