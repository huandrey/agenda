const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const registerController = require('./src/controllers/registerController');
const contactController = require('./src/controllers/contactController');
const { loginRequired } = require('./src/middlewares/middleware');
const { login } = require('./src/controllers/registerController');
// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login', registerController.index);

route.post('/login/register', registerController.register);

route.post('/login/entry', registerController.login);

route.get('/login/logout', registerController.logout);


// Rotas de contato 

route.get('/contato', loginRequired, contactController.index);
route.post('/contato', loginRequired, contactController.create)
route.get('/contato/:id', loginRequired, contactController.show)
route.post('/contato/edit/:id', loginRequired, contactController.edit)
route.get('/contato/delete/:id', loginRequired, contactController.delete)
module.exports = route;