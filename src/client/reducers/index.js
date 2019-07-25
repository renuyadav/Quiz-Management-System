import {combineReducers} from 'redux';
import questionBankReduer from './questionBankReducer';
import user from './user';
import quizBankReduer from './quizBankReducer';

const rootReducer = combineReducers({
    user: user,
    questionBankReduer: questionBankReduer,
    quizBankReduer: quizBankReduer
});

export default rootReducer;