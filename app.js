const { app } = require("./models/Config");
const { port } = require("./models/Config");
/**
 * Rotas
 */
app.get("/", (req, res) => {
    res.render("home");
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
