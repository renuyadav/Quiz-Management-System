const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//let QuestionsModel= require('./questionbank-model');
let QuestionsModel = require('./questionbank-model');

const quizesSchema = new Schema({
    name:{type:String, unique: true, required: true},
    description:{type:String, required: true},
    phone:{type:Number, required: true},
    questions: 
        [{ type: mongoose.Schema.ObjectId, ref: 'QuestionBankSchema' }],
    createdAt: {type:Date, default: Date.now}    
      
});

module.exports = mongoose.model('QuizSchema', quizesSchema);