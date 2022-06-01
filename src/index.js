const express = require("express");
const app = express();
const port = "3000";
app.use('/src/assets/css', express.static(__dirname + '/assets/css'));

// Template Engine
const handlebars = require("express-handlebars");
app.engine(
    "hbs",
    handlebars.engine({ defaultLayout: "main", extname: ".hbs" })
);
app.set("view engine", "hbs");

// Bando de Dados
const Sequelize = require("sequelize");
const sequelize = new Sequelize("sistemacadastro", "root", "admin", {
    host: "localhost",
    dialect: "mysql",
});

// Rotas
app.get("/", (req, res) => {
    res.render("formulario");
});

// app.post("/add", (req, res) => {
//     res.send("Formulário recebido.");
// });

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// console.log(__dirname)