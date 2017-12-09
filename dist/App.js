"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const environment_1 = require("./environment");
const LocalStrategy = passportLocal.Strategy;
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
        // Configure passport middleware
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        // Configure router
        // this.express.use('/', router);
        this.db = mongoose.createConnection(environment_1.environment.mongoUrl);
        // Configure mongodb
        this.db.on('openUri', this.open);
        this.db.on('error', this.error);
    }
    open() {
        console.log('Connected to DB!');
    }
    error(err) {
        console.log('DB Connection error:', err.message);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map