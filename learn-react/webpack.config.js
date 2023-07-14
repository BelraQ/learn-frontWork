const path = require('path');

module.exports = {
    name: "wordRelay-setting",
    mode: "development",
    devtool: "eval",
    resolve: {
        extensions: [".jsx"],
    },
    entry: {
        app: ["./client"],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js", 
    }
};