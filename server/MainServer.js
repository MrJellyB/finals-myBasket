// modules
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var route = require('./app/BL/routes.js');
var cors = require('cors');
var consts = require('./config/consts.js');
var dbUtils = require('./app/BL/DAL/database.js');
var basketModule = require('./app/BL/modules/basketModule.js');
var db = {};

// consts
var MONGO_URL = 'mongodb://localhost:27017';
//var MONGO_URL = 'mongodb://11:22@193.106.55.172:5555/test';

// get the app from the express
var app = express();

// config app to use post api
app.use(bodyParser.json());
// app.use( bodyParser.options());aa
app.use(express.static(__dirname + "/src"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// set up to db
dbUtils.setupDB(MONGO_URL, consts, route, function (p_db) {

    route.setupRoutes(app, p_db, dbUtils);

    // create the server
    var server = http.createServer(app);

    app.use(express.static(__dirname + "/src"));

    // listen for requests
    server.listen(8080, null, null, function () {
        console.log("Express server listening on port 8080");
    });
})


