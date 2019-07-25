import {call, takeEvery,takeLatest, put} from "redux-saga/effects";
import axios from 'axios';
import setAuthToken from '../components/setAuthToken';
import jwt_decode from 'jwt-decode';

function postDataToServer(url, data){
  return axios.post(url, data);
}
function updateDataToServer(url, data){
  return axios.put(url, data);
}
function getDataFromServer(url){
  return axios.get(url); 
}
function deleteDataFromServer(url){
  return axios.delete(url); 
}
function *loginClientAsync(action){
  try {
    // data is obtained after axios call is resolved
    let { data } = yield call(postDataToServer, 'http://localhost:3000/login/',action.payload.data);
    const { token } = data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    yield put({type:'LOGIN_SUCCESS', payload:decoded.name});
    action.payload.history.push("/question");
  } catch (err) {
    // catch error on a bad axios call
    yield put({type: 'GET_ERRORS', payload: err.response.data});
  }
}
function *fetchQuizBankAsync(action){
  try {
    let { data } = yield call(getDataFromServer, 'http://localhost:3000/quizes/');
    yield put({type:'FETCH_QUIZ_BANK_SUCCESS', payload:data});    
  } catch (err) {
    yield put({type: 'FETCH_QUIZ_BANK_FAILED', payload: err.response.data});
  }
}
function *updateQuizAsync(action){
  console.log("updateQuizasync>>" +action.payload);
  
  try {
    let { data } = yield call(updateDataToServer, 'http://localhost:3000/quizes/'+action.payload._id, action.payload);
    yield put({type:'UPDATE_QUIZ_SUCCESS', payload:data});    
  } catch (err) {
    yield put({type: 'UPDATE_QUIZ_FAILED', payload: err.response.data});
  }
}
function *addNewQuizAsync(action){
  //yield put({type:'FETCH_QUESBANK'});
  console.log("addNewQUiz aysn called>>" + action.payload);
  try {
    let { data } = yield call(postDataToServer, 'http://localhost:3000/quizes/',action.payload);
    yield put({type:'ADD_NEW_QUIZ_SUCCESS', payload:data});    
  } catch (err) {
    yield put({type: 'ADD_NEW_QUIZ_FAILED', payload: err.response.data});
  }
}
function *deleteQuizAsync(action){
  console.log("delete quiz called>>>" + action.idx);
  try {
    let { data } = yield call(deleteDataFromServer, 'http://localhost:3000/quizes/'+action.idx);
    yield put({type:'DELETE_QUIZ_SUCCESS', payload:action.idx});    
  } catch (err) {
    yield put({type: 'DELETE_QUIZ_FAILED', payload: err.response});
  }
}
function *registerClientAsync(action){
            try {
              // data is obtained after axios call is resolved
              let { data } = yield call(postDataToServer, 'http://localhost:3000/registerClient/',action.payload.data);
              action.payload.history.push("/");
            } catch (err) {
              // catch error on a bad axios call
              yield put({type: 'GET_ERRORS', payload: err.response.data});
            }
}
function *editQuestionAsync(action){
  try {
    yield put({type: 'EDIT_QUES_REQUEST'});
    const responseData = yield call(() => {
      return fetch('http://localhost:3000/questionBank/'+action.payload._id, {
        method:'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(action.payload)})
              .then(response => response.json())
      }
    );
    yield put({type: 'EDIT_QUES_SUCCESS', payload: responseData.data} );
  } catch (error) {
    yield put({type: 'EDIT_QUES_FAILED', payload: data});
}
}

function *addNewQuestionAsync(action){
  try {
    yield put({type: 'ADD_NEW_QUES_REQUEST'});
    const data = yield call(() => {
      return fetch('http://localhost:3000/questionBank/', {
        method:'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(action.payload)})
              .then(res => res.json())
      }
    );
    yield put({type: 'ADD_NEW_QUES_SUCCESS', payload: data} );
  } catch (error) {
    yield put({type: 'ADD_NEW_QUES_FAILED', payload: data});
}
}

function *deleteQuestionAsync(action){
  try {
    yield put({type: 'DELETE_QUES_REQUEST'});
    const data = yield call(() => {
      return fetch('http://localhost:3000/questionBank/'+action.idx, {
        method: 'DELETE'})
              .then(response => response)
      }
    );
      yield put({type: 'DELETE_QUES_SUCCESS', payload: action.idx} );
    } catch (error) {
      yield put({type: 'DELETE_QUES_FAILED', payload: action.idx});
  }

}
function *fetchQuesBankAsync(){
    try {
        yield put({type: 'FETCH_QUESBANK_REQUEST'});
        const data = yield call(() => {
          return fetch('http://localhost:3000/questionBank')
                  .then(res => res.json())
          }
        );
        yield put({type: 'FETCH_QUESBANK_SUCCESS', payload: data} );
      } catch (error) {
        yield put({type: 'FETCH_QUESBANK_FAILED', payload: data});
    }
}
export default function* rootSaga() {
    yield takeLatest('LOGIN_CLIENT', loginClientAsync);
    yield takeLatest('REGISTER_CLIENT', registerClientAsync);
    yield takeLatest('FETCH_QUESBANK', fetchQuesBankAsync);
    yield takeLatest('DELETE_QUESTION', deleteQuestionAsync);
    yield takeLatest('ADD_NewQuestion', addNewQuestionAsync);
    yield takeLatest('EDIT_Question', editQuestionAsync);
    yield takeLatest('ADD_NewQuiz', addNewQuizAsync);
    yield takeLatest('FETCH_QUIZBANK',fetchQuizBankAsync );
    yield takeLatest('DELETE_QUIZ', deleteQuizAsync);
    yield takeLatest('UPDATE_QUIZ', updateQuizAsync);
}