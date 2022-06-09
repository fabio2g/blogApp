const { app } = require("./models/Config");
const { PORT } = require("./models/Config");


app.get("/", (req, res) => {
    res.render("home");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
