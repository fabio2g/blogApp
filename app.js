const { app } = require("./models/Express");
const { PORT } = require("./models/Express");
const { bodyParser } = require("./models/BodyParser");
const { handlebars } = require("./models/Handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
