const express = require('express');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const {addContact} = require('../controllers/contact');
router.get('/', (req, res)=>{
    res.json({
        'add contact': '/api/contact/addcontact',
        'update contact': '/api/contact/updatecontact',
        'remove contact': '/api/contact/removecontact'
         });
})

router.post('/addcontact', [
    check('email').isEmail()
], addContact);

module.exports = router;