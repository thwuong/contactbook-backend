const { BadRequestError } = require("../errors")
const Contact = require('../models/contactbook.model')
const handlePromise = require('../helpers/promise.helper');
const  mongoose  = require("mongoose");
exports.create = async (req, res, next) => {
    if(!req.body.name){
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    // create contact
    const contact = new Contact({
        name : req.body.name,
        email : req.body.email,
        address : req.body.address,
        phone : req.body.phone,
        favorite : req.body.favorite === true,
    })
    // Save contact in db
    const [err, docs] = await handlePromise(contact.save());
    if(err){
        return next(new BadRequestError(500, "An error occurred while creating the contact"));
    }
    return res.send(docs)
}

exports.findAll = async (req, res, next) => {
    const condition = { };
    const { name } = req.query;

    if(name){
        condition.name = { $regex : new RegExp(name), $option: "i"};
    }


    const [err, docs] = await handlePromise(
        Contact.find(condition)
    );

    if(err){
        return next(new BadRequestError(500, "An error occurred while retrieving contacts"));
    }

    return res.send(docs);
}

exports.findOne = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id : id && mongoose.isValidObjectId(id) ? id : null
    };

    const [err, docs] = await handlePromise(
        Contact.findOne(condition)
    );

    if(err){
        return next(new BadRequestError(500,`
        Error retrieving contact with id =${req.params.id}`));
    }

    if(!docs){
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send(docs);
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0){
        return next(new BadRequestError(400,
            "Data to update can not be empty"));
    }
    const { id } = req.params;
    const condition = {
        _id : id && mongoose.isValidObjectId(id) ? id : null
    };

    const [err, docs] = await handlePromise(
        Contact.findOneAndUpdate(
            condition,
            req.body,{
            new : true
        })
    );

    if(err){
        return next(new BadRequestError(500,`
        Error updating contact with id =${req.params.id}`));
    }

    if(!docs){
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send({message : "Contact was updated successfully"});
    
}

exports.delete = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
        _id : id && mongoose.isValidObjectId(id) ? id : null
    };

    const [err, docs] = await handlePromise(
        Contact.findOneAndDelete(condition)
    );

    if(err){
        return next(new BadRequestError(500,`
        Error retrieving contact with id =${req.params.id}`));
    };

    if(!docs){
        return next(new BadRequestError(404, "Contact not found"));
    };

    return res.send({message : "Contact was deleted successfully"});

}

exports.deleteAll = async (req, res, next) => {
    const [err, docs] = await handlePromise(
        Contact.deleteMany({})
    );

    if(err){
        return next(new BadRequestError(500, 
        "An error occurred while removing all contacts"));
    };

    return res.send({
        message : `${docs.deletedCount} contacts were deleted successfully`
    });
}

exports.findAllFavorite = async (req, res, next) => {
    const [err, docs] = await handlePromise(
        Contact.find({})
    );

    if(err){
        return next(new BadRequestError(500
        , "An error occurred while favorite contacts"))
    };

    return res.send(docs);
}