require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = express.Router();
const routes = require("./api");
// const { blockchainHandle } = require("./blockchainapi");

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(
    cors({
        origin: "*",
        methods: ["POST", "GET"],
    })
);

routes(router);
app.use("/api", router);

const connectDB = require("./db");
global.sql = connectDB();

app.use(express.static(__dirname + "/build"));
app.get("/*", function (req, res) {
    res.sendFile(__dirname + "/build/index.html", function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

const port = process.env.SERVER_PORT || 5555;
app.listen(port, () => console.log(`Running on port ${port}`));
