exports.setupRoutes = function (app, db, dbUtils) {
    var basketModule = require('./modules/basketModule.js');

    basketModule.setup(dbUtils);

    app.get('/getUsers', basketModule.getUsers);
    // app.get('/login/:email/:password', basketModule.login);
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
    app.post('/authorize', basketModule.authorizeTwitter);
    app.get('/getCategories', basketModule.getCategories);
    app.get('/getProductDetails/:id', basketModule.getProductDetails);
    app.get('/getCategory/:id', basketModule.getCategoryById);
    app.get('/getProducts', basketModule.getProducts);
    app.get('/getProductsPaging/:page/:limit', basketModule.getProductsPaging);
    app.get('/getCheapestProductByCategory/:id', basketModule.getCheapestProductByCategory);
    app.get('/getBasket/:id', basketModule.getBasket);
    app.get('/getUserByUserName/:userName', basketModule.getUserByUserName); 
    app.get('/getAllStores', basketModule.getAllStores);
    app.get('/getIsraelTweets', basketModule.getIsraelTweets);

}