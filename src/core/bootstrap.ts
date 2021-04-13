import dotenv from 'dotenv';
dotenv.config();
require('source-map-support').install();
import 'colors';
var colors = require('colors');
colors.enable();

import {Express} from "express";
import bodyParser = require("body-parser");
import cors = require("cors");
import Routes from "./routes";

let express = require('express');

function startExpress() {
    let app: Express = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    const corsOptions = {
        credentials: true,
        // some legacy browsers (IE11, various SmartTVs) choke on 204
        optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));

    return app;
}

const app = startExpress();
new Routes(app);

app.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port ${process.env.APP_PORT}`.yellow.bold)
});
