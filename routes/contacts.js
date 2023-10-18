const express = require('express');
const router = express.Router();
const cors = require('cors')

const contactsController = require('../controllers/contacts');
const { idValidationRule, contactsValidationRule, validate } = require('../middleware/validator.js');


const corsOptions = {
  origin: '*'
}

router.get('/', cors(corsOptions), contactsController.getAll);

router.get('/:id', cors(corsOptions), contactsController.getSingle);

router.post('/', cors(corsOptions), contactsValidationRule(), validate, contactsController.createContact);

router.put('/:id', cors(corsOptions), contactsValidationRule(), validate, contactsController.updateContact);

router.delete('/:id', cors(corsOptions), idValidationRule(), validate, contactsController.deleteContact);

module.exports = router;
