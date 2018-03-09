var mongodb = require('mongodb');
var request = require('request');
var jwt = require('jsonwebtoken');

var ObjectID = mongodb.ObjectID;

var dbUtils = null;

exports.setup = function (db) {
    dbUtils = db;
}

exports.getUsers = function (req, res) {
    dbUtils.getUsers(function (err, results) {
        res.send(results);
    })
}

exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    dbUtils.login(email, password, function (err, data) {
        res.send((data && Object.keys(data).length !== 0));
    })
}


exports.loginWithAuthenticate = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    dbUtils.loginWithAuthenticate(email, password, function (err, data) {
        if (data && data.length != 0) {
            data.token = jwt.sign({ sub: data._id }, 'darksecret')
            res.send(data);
        }
        else
        {
            res.send(false);
        }
    })
}




exports.register = function (req, res) {
    var data = req.body.data;
    dbUtils.register(data, function (err, data) { res.send(true) });
}

exports.getCategories = function (req, res) {
    dbUtils.getCategories(function (err, data) { res.send(data); });
}

exports.getProductDetails = function (req, res) {
    var id = req.params.id;
    dbUtils.getProductDetails(id, function (err, data) {

        console.log("product-details: " + data)

        var dataToSend = data;
        res.send(data);
    })
}

exports.getCategoryById = function (req, res) {
    var id = req.params.id;
    dbUtils.getCategoryById(id, function (err, data) {
        res.send(data);
    })
}

exports.saveProduct = function (req, res) {
    var productDetails = req.body.data;
    dbUtils.getNextSequence("productId", function (err, nextSeqId) {
        dbUtils.getCurrentSeq("productId", function (err, currSeqId) {
            productDetails.id = currSeqId[0].seq;
            dbUtils.saveProduct(productDetails, function (err, data) {
                res.send(JSON.stringify(productDetails.id));
            });
        })
    })
}

exports.getProducts = function (req, res) {
    dbUtils.getProducts(function (err, data) {
        res.send(data);
    })
}

exports.getProductsPaging = function (req, res) {
    var page = +req.params.page;
    var limit = +req.params.limit;

    dbUtils.getProductsPaging(page, limit, function (err, data) {
        res.send(data);
    })
}

exports.updateProduct = function (req, res) {
    var productToUpdate = req.body.data;
    var productId = req.body.data.id;
    var oldPrice = req.body.data.oldPrice;
    console.log(req.body);
    dbUtils.updateProduct(productId, productToUpdate, function (err, data) {

        // the price is changed
        if (oldPrice != productToUpdate.price) {
            dbUtils.addOldPriceToArray(productId, oldPrice, function (err, data) {
                console.log("after 2 updated");
                //res.send(true);
            })
        }

        res.send(true);
    })
}

exports.deleteProduct = function (req, res) {
    var productToUpdate = req.body.data;
    var productId = req.body.data.id;

    dbUtils.deleteProduct(productId, function (err, data) {
        res.send(true);
    })
}

exports.addCommentToProduct = function (req, res) {
    var productId = req.body.data.prodctId;
    var comment = req.body.data.comment;
    var grade = req.body.data.grade;
    debugger;
    dbUtils.addCommentToProduct(productId, comment, grade, function (err, data) {
        res.send(true);
    })
}


exports.getCheapestProductByCategory = function (req, res) {
    var id = req.params.id;
    dbUtils.getCheapestProductByCategory(id, function (err, data) {
        res.send(data);
    })
}

exports.saveBasket = function (req, res) {
    var details = req.body.data;
    dbUtils.getNextSequence("basketId", function (err, nextSeqId) {
        dbUtils.getCurrentSeq("basketId", function (err, currSeqId) {
            details.id = currSeqId[0].seq;

            dbUtils.saveBasket(details, function (err, data) {
                res.send(JSON.stringify(details.id));
            });
        });
    })
}

exports.getBasket = function (req, res) {
    var id = req.params.id;
    dbUtils.getBasket(id, function (err, data) {
        res.send(data);
    })
}

exports.getUserByUserName = function (req, res) {
    var userName = req.params.userName;
    console.log(userName);
    dbUtils.getUserByUserName(userName, function (err, data) {
        res.send(data);
    })
}

exports.removeUser = function (req, res) {
    var data = req.body.data;

    dbUtils.removeUser(data, function (err, data) {
        res.send(true);
    })
}

exports.changeUserTypeStatus = function (req, res) {
    var userName = req.body.userName;
    var statusToChange = req.body.statusToChange;
    console.log("user = " + userName + " and status =" + statusToChange)

    dbUtils.changeUserTypeStatus(userName, statusToChange, function (err, data) {
        res.send(true);
    })
}

exports.resetPassword = function (req, res) {
    var userName = req.body.userName;
    console.log("user = " + userName)

    dbUtils.resetPassword(userName, function (err, data) {
        res.send(true);
    })
}

exports.updateBasket = function (req, res) {
    var data = req.body.data;
    console.log("data = " + data)

    dbUtils.updateBasket(data, function (err, data) {
        res.send(true);
    });
}

exports.getAllStores = function (req, res) {
    console.log("before update")
    dbUtils.getAllStores(function (err, data) {
        console.log("after update")

        res.send(data);
    });
}

var twitterSettings = {
    consumerkey: 'm5wDu8TeKAEiW743bR2dE8QJw',
    consumersecret: 'uh6QbbWQXJ84PgLnEKMZam6adMu0Im1HnocEjlS0jCaDuhP0Q7',
    bearertoken: ''
};

exports.authorizeTwitter = function (req, res) {
    console.log("twitter web api");

    var header = twitterSettings.consumerkey + ':' + twitterSettings.consumersecret;
    var encheader = new Buffer(header).toString('base64');
    var finalheader = 'Basic ' + encheader;

    request.post('https://api.twitter.com/oauth2/token', {
        form: { 'grant_type': 'client_credentials' },
        headers: { Authorization: finalheader }
    }, function (error, response, body) {
        if (error)
            console.log(error);
        else {
            twitterSettings.bearertoken = JSON.parse(body).access_token;

            res.json({ success: true, data: twitterSettings.bearertoken });
        }

    })
}

exports.getIsraelTweets = function (req, res) {

    var searchquery = req.body.query;
    var encsearchquery = encodeURIComponent(searchquery);
    var bearerheader = 'Bearer ' + twitterSettings.bearertoken;
    request.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Israel&count=10' + encsearchquery +
        '&result_type=recent', { headers: { Authorization: bearerheader } }, function (error, body, response) {
            if (error) {
                console.log(error);
            }
            else {
                res.json({ success: true, data: JSON.parse(body.body) });
            }
        });
}
