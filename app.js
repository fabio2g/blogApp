const { app } = require("./config/appConfig");
const { port } = require("./config/appConfig");

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
