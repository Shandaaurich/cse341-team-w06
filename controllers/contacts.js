const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const HttpStatus = require("../exceptions/httpStatusCodes.js")

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(HttpStatus.OK).json(lists);
    });
  }
  catch (error) {
    next(error);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(HttpStatus.OK).json(lists[0]);
    });
  }
  catch(error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(HttpStatus.CREATED).json(response);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response.error || 'Some error occurred while creating the contact.');
    }
  }
  catch(error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response.error || 'Some error occurred while updating the contact.');
    }
  }
  catch(error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response.error || 'Some error occurred while deleting the contact.');
    }
  }
  catch(error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
