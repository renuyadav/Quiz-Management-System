let express = require('express');
let quizesRouter = express.Router();
let quizesModel = require('../models/quizes-model');
let QuestionsBank = require('../models/questionbank-model');

quizesRouter.get('/', function(req, res, next){
    quizesModel.find((err, result)=> {
    if(err){
        //next(err);
        return  result.status(400).send(err);
    }
    res.send(result);
    }); 
});

quizesRouter.post('/', function(req, res, next){
    const newQuiz = new quizesModel(req.body);
    newQuiz.save((err, result) =>{
    if (err){
        if (err.name === 'MongoError' && err.code === 11000) {
            // Duplicate quizName
            return res.status(400).send({quizName: 'This quiz already exist, please use different name!' });
        }
        return res.status(400).send(err);
    }
    res.send({msg:"quiz added", data:result});
    });
});

quizesRouter.route('/:quiz_id')

    // get the question with that id (accessed at GET http://localhost:3000/api/questionBank/:question_id)
    .get(function(req, res,next) {
        quizesModel.findById(req.params.quiz_id, function(err, result) {
            if(err){
                return res.status(400).send(err);
            }
            res.send(result);
        })
    })
    // update the Questions with this id (accessed at PUT http://localhost:3000/api/questionBank/:question_id)
   .put(function(req, res, next) {

        // use our QuestionsBank model to find the question we want
        quizesModel.findByIdAndUpdate(req.params.quiz_id, req.body, function(err, result) {
            if (err){
                next(err);
            }
            console.log("check here>>" + req.body);
            res.send({msg:"address updated", data:req.body});

        });
    })
    
    .delete(function(req, res, next){
        console.log("delete one>>" + req.params.quiz_id);
        quizesModel.findByIdAndRemove(req.params.quiz_id, function(err, result) {
            if(err){
                if (err.name === 'CastError')
                return res.status(400).send({err:"Data was not dound"});

                return res.status(400).send(err);  
            }
            res.send('deleted');
            //res.redirect('/quizes');
        }) 

});







module.exports = quizesRouter;