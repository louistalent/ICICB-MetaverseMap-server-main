const mysql = require("mysql2");
const util = require("util");

module.exports = function () {
    var con = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        database: "metaversemap",
        password: "",
        insecureAuth: true,
    });

    con.connect(function (err) {
        if (!err) console.log("MYSQL Connected!");
    });

    con.on("error", function onError(err) {
        console.log("db error", err);
    });

    return {
        query(sql, args) {
            return util.promisify(con.query).call(con, sql, args);
        },
        close() {
            return util.promisify(con.end).call(con);
        },
    };
};
