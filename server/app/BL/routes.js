﻿exports.setupRoutes = function (app, db, dbUtils) {
    var basketModule = require('./modules/basketModule.js');

    basketModule.setup(dbUtils);

    app.get('/getUsers', basketModule.getUsers);
    app.post('/login', basketModule.login);
    app.post('/loginWithAuthenticate', basketModule.loginWithAuthenticate);
    app.post('/register', basketModule.register);
    app.post('/saveProduct', basketModule.saveProduct);
    app.post('/updateProdct', basketModule.updateProduct);
    app.post('/deleteProduct', basketModule.deleteProduct);
    app.post('/addCommentToProduct', basketModule.addCommentToProduct);
    app.post('/saveBasket', basketModule.saveBasket);
    app.post('/updateBasket', basketModule.updateBasket);
    app.post('/removeUser', basketModule.removeUser);
    app.post('/changeUserTypeStatus', basketModule.changeUserTypeStatus);
    app.post('/resetPassword', basketModule.resetPassword);
    app.post('/saveProfileBuilder', basketModule.createProfileToUser)
    app.post('/getProductsWithParamsAndPaging', basketModule.getProductsWithParamsAndPaging);
    app.get('/getCategories', basketModule.getCategories);
    app.get('/getProductDetails/:id', basketModule.getProductDetails);
    app.get('/getCategory/:id', basketModule.getCategoryById);
    app.get('/getProducts', basketModule.getProducts);
    app.get('/getProductsPaging/:page/:limit', basketModule.getProductsPaging);
    app.get('/getProductsPagingByCategory/:category/:page/:limit', basketModule.getProductsPagingByCategory);
    app.get('/getCheapestProductByCategory/:id', basketModule.getCheapestProductByCategory);
    app.get('/getBasket/:id', basketModule.getBasket);
    app.get('/getUserByUserName/:userName', basketModule.getUserByUserName);
    app.get('/getBasketByUser', basketModule.getBasketByUser);
    app.get('/getAllStores', basketModule.getAllStores);
    app.get('/getCities', basketModule.getCities);
    app.get('/getProductSize', basketModule.getProductSize);
    app.get('/getProductSizeByCategory/:category', basketModule.getProductSizeByCategory);
}