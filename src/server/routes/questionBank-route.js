let express = require('express');
let questionBankRouter = express.Router();
let QuestionsBank = require('../models/questionbank-model');

questionBankRouter.get('/', function(req, res, next){
  
    QuestionsBank.find((err, result)=> {
    if(err){
        next(err);
    }
    res.send(result);
    }); 
});
questionBankRouter.post('/' , function(req, res, next){
    const newQues = new QuestionsBank(req.body);
    newQues.save((err, ques) =>{
    if (err){
        next(err);
    }
    //console.log("post>>" + ques);
    res.send(ques);
    });
});

questionBankRouter.route('/:question_id')

    // get the question with that id (accessed at GET http://localhost:3000/api/questionBank/:question_id)
    .get(function(req, res,next) {
        QuestionsBank.findById(req.params.question_id, function(err, result) {
            if(err){
                next(err);
            }
            res.send(result);
        })
    })
    // update the Questions with this id (accessed at PUT http://localhost:3000/api/questionBank/:question_id)
   .put(function(req, res, next) {

        // use our QuestionsBank model to find the question we want
        QuestionsBank.findByIdAndUpdate(req.params.question_id, req.body, function(err, result) {
            if (err){
                next(err);
            }
            console.log("check here>>" + req.body);
            res.send({msg:"address updated", data:req.body});

        });
    })
    
    .delete(function(req, res, next){
        console.log("delete one>>" + req.params.question_id);
        QuestionsBank.findByIdAndRemove(req.params.question_id, function(err, result) {
            if(err){
                next(err);
            }
            res.send("Deleted");
        }) 

});



module.exports = questionBankRouter;