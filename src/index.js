import express from "express";
import handlebars from "express-handlebars";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
// import { Produto } from "./models/Produto";

const app = express();
const PORT = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * -------------------------------------------
 * Configuração do Handlebars template engine.
 * -------------------------------------------
 */
app.engine(
    "hbs",
    handlebars.engine({ defaultLayout: "main", extname: ".hbs" })
);
app.set("view engine", "hbs");

/**
 * ---------------------------
 * Configuração do Body-Parser
 * ---------------------------
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * ----------------------------------
 * Configuração de arquivos estáticos
 * ----------------------------------
 */
app.use("/src/assets/css", express.static(__dirname + "/assets/css"));
app.use("/src/assets/css", express.static(__dirname + "/assets/js"));
app.use(
    "/src/vendor/bootstrap/css",
    express.static(__dirname + "/vendor/bootstrap/css")
);
app.use(
    "/src/vendor/bootstrap/js",
    express.static(__dirname + "/vendor/bootstrap/js")
);

/**
 * ---------------------
 * Configuração de rotas
 * ---------------------
 */
app.get("/", (req, res) => {
    res.render("formulario");
});

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});
