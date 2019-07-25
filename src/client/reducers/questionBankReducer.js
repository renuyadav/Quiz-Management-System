const initialState = {questions:[],showAddQuestionModal:false, showEditModal: false};
const questionBankReduer =(state=initialState, action) =>{
    switch(action.type){
        case 'FETCH_QUESBANK_SUCCESS':
        console.log("fetch success called>>"+ action);
        return {
            ...state,
            questions:action.payload,
        }
        case 'FETCH_QUESBANK_FAILED':
        return state;
        case 'DELETE_QUES_SUCCESS':
        console.log("Delete success called>>");
        const newQuestions = state.questions.filter(question => question._id !== action.payload); // Use filter method to remoreove the item that has been deleted from the st
        return {
            ...state,
            questions:newQuestions
        }
        case 'SHOW_ADD_QUES_MODAL':
        return{
            ...state, showAddQuestionModal:true
        }
        case 'HIDE_ADD_QUES_MODAL':
        return{
            ...state, showAddQuestionModal:false
        }
        case 'ADD_NEW_QUES_SUCCESS':
        return{
            ...state, questions: [...state.questions, action.payload], showAddQuestionModal:false
        }
        case 'SHOW_EDIT_MODAL':
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
        }
        default:
        return state;
    }

}
export default questionBankReduer;