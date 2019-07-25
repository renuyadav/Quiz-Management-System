var express = require('express');
var router = express.Router();
var User = require('../models/user-model');

router.get('/', function(req, res, next){
    User.find((err, result)=> {
    if(err){
        next(err);
    }
        res.send(result);
    }); 
});

router.post('/' , function(req, res, next){
    let user = new User(req.body);
    
    if (!user.name) {
        return res.send({
          success: false,
          message: 'Name cannot be blank.'
        });
      }
      if (!user.userName) {
        return res.send({
          success: false,
          message: 'User Name cannot be blank.'
        });
      }
      if (!user.email) {
        return res.send({
          success: false,
          message: 'Email cannot be blank.'
        });
      }
      if (!user.password) {
        return res.send({
          success: false,
          message: 'Password cannot be blank.'
        });
      }
    user.email = user.email.toLowerCase();
    user.email = user.email.trim();

    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
        email: user.email
      }, (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: 'Error: Account already exist.'
          });
        }
        user.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: 'User has been registered succesfully.'
          });
        });
      });
})

module.exports = router;