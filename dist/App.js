"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const environment_1 = require("./environment");
const modules_1 = require("./modules");
const routes_1 = require("./routes");
class App {
    constructor() {
        this.express = express();
        if (environment_1.environment.name === 'development') {
            this.express.use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Access-Control-Allow-Credentials', true);
                next();
            });
        }
        this.express.use(bodyParser.json());
        this.express.use(methodOverride('X-HTTP-Method-Override'));
        this.express.use(express.static(path.join(__dirname, '..', 'dist')));
        // Use modules
        modules_1.default(this.express);
        // Configure router
        this.express.use('/', routes_1.router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map