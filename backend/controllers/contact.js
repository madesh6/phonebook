require('dotenv').config()
const mongoose = require('mongoose');
const User = require('../models/contact');
const {check, validationResult} = require('express-validator');
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
exports.addContact = async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      };
    await User.findOne({'name': req.body.name}, (e,c)=> {
        if(c !== null) {
            res.send(`contact with name ${req.body.name} already exists`);
        }
    });
    let checkPhone = (phone, index)=>{
         User.findOne({'phone': phone}, (e,c)=> {
            console.log(phone, c)
            if(c !== null){
                res.send(`contact with phone number ${phone} already exists`);
            }
        });
    }
    let callCheckPhone = ()=>{
        if(Array.isArray(req.body.phone)) 
            req.body.phone.forEach(checkPhone);
        else if(typeof(req.body.phone) === "string")
            checkPhone(req.body.phone, 0);
        else
            return res.send('phone must be a string or array of strings');
    }
    await callCheckPhone();
    await User.create(req.body,(e,c)=>{
        if(e)
            console.log(e);
        return res.send(c);
    });
};
