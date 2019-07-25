const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../validation/login');

const Client = require('../models/user-model');

router.post('/', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).send(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Client.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                name: user.userName,
                            }
                            console.log("payload check>>" +payload.name +"::"+ user.email +"::"+ user.userName+"::"+ user.name);
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) return res.status(400).send(err);
                                else {
                                    console.log("user name>>>" +user);
                                    res.send({
                                        success: "user logged in succesfully",
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).send(errors);
                        }
                    });
        });
});
/*
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("success>>" + req.user +"::"+ res.user);
   res.send(req.user);
});
*/

module.exports = router;