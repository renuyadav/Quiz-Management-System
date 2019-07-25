const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    category:{type:Array},
    questionTxt:{type:String, required: true},
    options:{type:Object, required: true},
    isMultiple:{type:Boolean},
    time:{type:Number,required: true}
});

/*
const quizesSchema = new Schema({
    name:{type:String, required: true},
    description:{type:String, required: true},
    questions: 
        [{ type: mongoose.Schema.ObjectId, ref: 'QuestionBankSchema' }]
      
});

module.exports = mongoose.model('QuizSchema', quizesSchema);*/

module.exports = mongoose.model('QuestionBankSchema', questionSchema);

