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
var io = require('socket.io')(http);

// consts
var MONGO_URL = 'mongodb://localhost:27017';

// get the app from the express
var app = express();

// config app to use post api
app.use( bodyParser.json());
// app.use( bodyParser.options());aa
app.use(express.static(__dirname + "/src"));

app.use(bodyParser.urlencoded({extended: false}));
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

    var listener = io.listen(server);
    listener.sockets.on('connection', (socket) => {
        // send event to the client
        socket.emit('WelcomeEvent', {
            msg: 'ברוך הבא לאתר המוצרים שלנו, במסך הבא תראה אודות עבור האתר.'
        });

        socket.on('GetUsernameFromClient', (data) => {
            console.log(data.msg);
        });
    })
})


