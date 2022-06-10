const { express } = require("./models/Config");
const { app } = require("./models/Config");
const { port } = require("./models/Config");
const { admin } = require("./routes/admin");

/**
 * ----------------------------------
 * Configuração de arquivos estáticos
 * ----------------------------------
 */
app.use(express.static(__dirname + "/public"));

app.use(admin);


/**
 * Configuração de rotas
 */
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
