const { param, check, validationResult } = require('express-validator');
 
exports.contactsValidationRule = () => {
  return [
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('favoriteColor', 'favoriteColor is required').not().isEmpty(),
    check('birthday', 'Birthday must be in format mm/dd/yyy').matches("^[0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2}$")
  ];
}

exports.idValidationRule = () => {
  return [
    param('id', 'id is required to be 24-chars').isLength(24)
  ];
}

exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  console.log(errors.array());
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

