var mongodb = require('mongodb');
var request = require('request');
var jwt = require('jsonwebtoken');

var ObjectID = mongodb.ObjectID;

var dbUtils = null;

exports.setup = function (db) {
    dbUtils = db;
}


// USERS
// =============================================
// =

exports.getUsers = function (req, res) {
    dbUtils.getUsers(function (err, results) {
        dbUtils.getGenders(function (err, genders) {
            for (var index = 0; index < results.length; index++) {
                if (results[index].gender == genders[0].id) {
                    results[index].genderValue = genders[0].value;
                } else if (results[index].gender == genders[1].id) {
                    results[index].genderValue = genders[1].value;
                }
                if (results[index].userType == 1) {
                    results[index].userTypeValue = "אורח"
                } else if (results[index].userType == 2) {
                    results[index].userTypeValue = "מנהל"
                }
            }
            res.send(results);
        })
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
            data.token = jwt.sign({
                sub: data._id
            }, 'darksecret')
            res.send(data);
        } else {
            res.send(false);
        }
    })
}

exports.register = function (req, res) {
    var data = req.body.data;
    dbUtils.register(data, function (err, data) {
        res.send(true)
    });
}

exports.getUserByUserName = function (req, res) {
    var userName = req.params.userName;
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

    dbUtils.changeUserTypeStatus(userName, statusToChange, function (err, data) {
        res.send(true);
    })
}

exports.resetPassword = function (req, res) {
    var userName = req.body.userName;

    dbUtils.resetPassword(userName, function (err, data) {
        res.send(true);
    })
}

exports.createProfileToUser = function (req, res) {
    var profile = req.body.data;
    var userName = req.body.userName;

    dbUtils.addProfileToUser(userName, profile, function (err, data) {
        if (err) return res.send(false);
        if (data) return res.send(true);
        return res.send(false);
    })
    //})
}

// =============================================

// CATEGORIES
// =============================================
exports.getCategories = function (req, res) {
    dbUtils.getCategories(function (err, data) {
        res.send(data);
    });
}

exports.getCategoryById = function (req, res) {
    var id = req.params.id;
    dbUtils.getCategoryById(id, function (err, data) {
        res.send(data);
    })
}
// =============================================

// PRODUCTS
// =============================================
exports.getProductDetails = function (req, res) {
    var id = req.params.id;
    dbUtils.getProductDetails(id, function (err, data) {
        var dataToSend = data;
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

exports.getProductsPagingByCategory = function (req, res) {
    var page = +req.params.page;
    var limit = +req.params.limit;
    var category = +req.params.category;


    dbUtils.getProductsPagingByCategory(category, page, limit, function (err, data) {
        res.send(data);
    })
}

exports.getProductsWithParamsAndPaging = function (req, res) {

    if (req.body.data) {
        var page = +req.body.data.page;
        var limit = +req.body.data.limit;
        var params = req.body.data.params;

        dbUtils.getProductsWithParamsAndPaging(page, limit, params, function (err, productPaging) {
            dbUtils.getProductSizeByParams(params, function (err, totalCountProducts) {
                var productData = {
                    totalCountProducts,
                    productPaging
                };
                res.send(productData);
            })
        })
    }
}

exports.updateProduct = function (req, res) {
    var productToUpdate = req.body.data;
    var productId = req.body.data.id;
    var oldPrice = req.body.data.oldPrice;
    dbUtils.updateProduct(productId, productToUpdate, function (err, data) {

        // the price is changed
        if (oldPrice != productToUpdate.price) {
            dbUtils.addOldPriceToArray(productId, oldPrice, function (err, data) {
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

exports.getProductSize = function (req, res) {
    dbUtils.getProductSize(function (err, data) {
        res.send(data);
    })
}

// BASKETS METHODS
// =============================================
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

exports.updateBasket = function (req, res) {
    var data = req.body.data;
    dbUtils.updateBasket(data, function (err, data) {
        res.send(true);
    });
}

exports.getBasketByUser = function (req, res) {
    const userName = req.query.user;
    dbUtils.getBasketByUser(userName, function (err, data) {
        res.send(data);
    });
}
// =============================================

// STORES METHODS
// =============================================
exports.getAllStores = function (req, res) {
    dbUtils.getAllStores(function (err, data) {

        res.send(data);
    });
}
// =============================================


// =============================================


// STORES CITIES
// =============================================
exports.getCities = function (req, res) {
    dbUtils.getCities(function (err, data) {
        res.send(data);
    });
}
// =============================================