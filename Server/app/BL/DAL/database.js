var http = require('http');
var express = require('express');
var mongodb = require('../../../node_modules/mongodb');
var ObjectID = mongodb.ObjectID;
var mongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var consts = null;

var collections = ['users', 'category','product', 'counters', 'basket', 'store'];

// log on to db
exports.setupDB = function (dbUrl, con, p_db, callback) {
    consts = con;

    mongoClient.connect(dbUrl, function (err, client) {
        if (err) {
            console.log("Could not  connect to DB");
            return;
        }

        var database = client.db('test');
        console.log('Connect to db');

        for (col = 0; col < collections.length; col++) {
            database[collections[col]] = database.collection(collections[col]);
        }
        
        db = database;

        p_db = database;

        callback(p_db);
    })
}

exports.getUsers = function (callback) {
    db.users.find({}).toArray(callback);
}

exports.login = function (email, password, callback) {
    db.users.find({ "email": email, "password": password }).toArray(callback);
}

exports.loginWithAuthenticate = function (email, password, callback) {
    console.log("bbbbbbbbbbbbbbbbbbbb")
    db.users.findOne(
        {
            "email": email,
            "password": password
        },
        {
            projection:
            {
                "userName": 1
            }
        }, callback);
}

exports.register = function (data, callback) {
    db.users.insert(data, callback);
}

exports.getCategories = function(callback) {
    db.category.find({}).toArray(callback);
}

exports.getProductDetails = function (id, callback) {
    var idToSearch = +id;
    db.product.find({ "id": idToSearch}).toArray(callback);
}

exports.getCategoryById = function (id, callback) {
    var idToSearch = +id;
    db.category.find({ "id": idToSearch }).toArray(callback);
}

exports.saveProduct = function (data, callback) {
    db.product.insert(data, callback);
}

exports.getNextSequence = function(name,callback) {
    var filter = { _id: name };
    var updateQuery = { $inc: { seq: 1 } };
    var ret = db.counters.findAndModify(
        { _id: name },
        [['_id', 'asc']],
        { $inc: { seq: 1 } },callback);
}

exports.getCurrentSeq = function (name, callback) {
    db.counters.find({ "_id": name }).toArray(callback);
}

exports.getProducts = function (callback) {
    db.product.find().toArray(callback);
}

exports.getProductsPaging = function (page, limit, callback) {
    var perPage = limit;
    db.product
        .find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .toArray(callback);
}

exports.updateProduct = function (idProduct, productToUpdate, callback) {
    var filterQuery = { 'id': idProduct }
    var updateQuery = {
        "name": productToUpdate.name,
        "price": productToUpdate.price,
        "category": productToUpdate.category,
        "calories": productToUpdate.calories,
        "createCountry": productToUpdate.createCountry,
        "company": productToUpdate.company
    };
    var options = {
        upsert: true
    };
    db.product.update(filterQuery,{ $set: updateQuery },options, callback);
}

exports.addOldPriceToArray = function (idProduct, oldPrice, callback) {
    var filterQuery = { 'id': idProduct };
    var newObj = oldPrice;
    var currentTime = new Date();
    query = {
        "oldPriceArray": { "curr": newObj, "createdTime": currentTime }
    }
    db.product.update(filterQuery, { $push: query }, callback)
}

exports.deleteProduct = function (idProduct, callback) {
    var filterQuery = { 'id': idProduct };

    db.product.remove(filterQuery, callback);
}

exports.addCommentToProduct = function (productId, comment, grade ,callback) {

    var filterQuery = { 'id': productId };
    query = {
        "comments": {
            "comment": comment,
            "grade": grade
        }
    }
    db.product.update(filterQuery, { $push: query }, callback);
}

exports.getCheapestProductByCategory = function(categoryId, callback) {
    console.log(categoryId);
    db.product.aggregate([
            { '$sort': { 'price': 1 } },
            {
                "$group": {
                    "_id": "$category",
                    "value": { $min: "$price" },
                    "_productId": { $first: '$id' }
                }
            },
            { "$match": { "_id": +categoryId } }
        ]).toArray(callback);
}

exports.saveBasket = function (data, callback) {
    db.basket.insert(data, callback);
}

exports.getBasket = function (id, callback) {
    db.basket.find({ "id": +id }).toArray(callback);
}

exports.getUserByUserName = function (userName, callback) {
    db.users.find({ "userName": userName }).toArray(callback);
}


exports.removeUser = function (data, callback) {
    console.log(data);
    db.users.remove({ "userName": data }, callback);

}

exports.changeUserTypeStatus = function (userName, statusToChange, callback) {
    db.users.update({ 'userName': userName }, { $set: { "userType": statusToChange } }, callback);
}


exports.resetPassword = function (userName, callback) {
    db.users.update({ 'userName': userName }, { $set: { "password": "123456" } }, callback);
}

exports.updateBasket = function (data, callback) {
    
    var filterQuery = { 'id': data.id }
    var updateQuery = {
        "basketItems": data.basketItems,
        "totalPrice": data.totalPrice,
        "streetName": data.streetName
    };
    var options = {
        upsert: true
    };
    db.basket.update(filterQuery, { $set: updateQuery }, options, callback);
    
    console.log(data.id);
}

exports.getAllStores = function (callback) {
    db.store.find({}).toArray(callback);
}