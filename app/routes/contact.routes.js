const express = require("express");
const contacts = require('../controllers/contact.controller');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = (app) => {
    const router = express.Router();

    // [GET] /favorite 
    router.get('/favorite', contacts.findAllFavorite)
    // [GET] /:id
    router.get('/:id', contacts.findOne)
    // [PUT] /:id
    router.put('/:id',urlencodedParser, contacts.update)
    // [DELETE] /:id
    router.delete('/:id', contacts.delete)
    // [GET] /
    router.get('/', contacts.findAll)
    // [Post] /
    router.post('/',urlencodedParser, contacts.create)
    // [DELETE] /
    router.delete('/', contacts.deleteAll)

    app.use('/api/contacts', router)

}