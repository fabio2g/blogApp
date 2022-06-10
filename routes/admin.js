const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Principal");
});

router.get("/post", (req, res) => {
    res.send("Posts");
});

module.exports = router;
