const initialState = {quizes:[], isAdded:false, quizToEdit:{},errors:[]};
const quizBankReduer =(state=initialState, action) =>{
    switch(action.type){
        case 'FETCH_QUIZBANK_REQUEST':
        return state;
        case 'FETCH_QUIZ_BANK_SUCCESS':
        console.log("fetch success called>>");
        return {
            ...state,
            quizes:action.payload,
            isAdded:false
        }
        case 'EDIT_QUIZ':
        return{
            ...state, quizToEdit:action.payload
        }
        case 'FETCH_QUIZ_BANK_FAILED':
        return{
            ...state, errors: [...state.errors, action.payload]
        }
        case 'DELETE_QUIZ_SUCCESS':
        const newQuiz = state.quizes.filter(quiz => quiz._id !== action.payload); // Use filter method to remoreove the item that has been deleted from the st
        return{
            ...state, quizes: newQuiz
        }
        case 'DELETE_QUIZ_FAILED':
        console.log("Delete failed called>>" + action.payload.data );
        return{
            ...state, errors: [...state.errors, action.payload]
        }
        case 'UPDATE_QUIZ_SUCCESS':
        const updatedQuiz= Object.assign(state.quizes, state.quizes.map(quiz=> quiz._id === action.payload._id? action.payload : quiz))
        
        return{
            ...state, quizes:updatedQuiz, isAdded:true
        }
        case 'UPDATE_QUIZ_FAILED':
        return{
            ...state, errors: [...state.errors, action.payload], isAdded:false
        }       
        case 'ADD_NEW_QUIZ_SUCCESS':
        return{
            ...state, quizes: [...state.quizes, action.payload.data], isAdded:true
        }
        case 'ADD_NEW_QUIZ_FAILED':
        return{
            ...state, errors: [...state.errors, action.payload], isAdded:false
        }

       /* case 'SHOW_EDIT_MODAL':
        return{
            ...state, showEditModal:true
        }
        case 'HIDE_EDIT_MODAL':
        return{
            ...state, showEditModal:false
        }
        case 'EDIT_QUES_SUCCESS':
        const updatedQues= Object.assign(state.questions, state.questions.map(ques=> ques._id === action.payload._id? action.payload : ques))
        
        return{
            ...state, questions:updatedQues, showEditModal:false
        }*/
        default:
        return state;
    }

}
export default quizBankReduer;