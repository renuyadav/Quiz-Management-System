const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');

const Client = require('../models/user-model');

const saltRounds = 10;

router.post('/', function(req, res, next) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).send(errors);
    }
    Client.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).send({
                email: 'Email already exists'
            });
        }
        else {
            const newUser = new Client(req.body);
            bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
                if(err) console.log('There was an error', err);
                else {
                    newUser.password = hash;
                    newUser.save((err,user) =>{
                        if(err){
                            console.log("if error block");
                            if (err.name === 'MongoError' && err.code === 11000) {
                                // Duplicate username
                                return res.status(400).send({userName: 'UserName has already taken!' });
                            }
                        
                            next();
                        }
                        res.send(user)
                    });
                }
            });
  
        }
    });
});

module.exports = router;