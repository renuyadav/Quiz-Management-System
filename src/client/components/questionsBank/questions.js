import React , { Component } from 'react';
import {connect} from 'react-redux';
import AddQuestion from './addQuestion';
import EditQuestion from './editQuestions';
import {Link} from 'react-router-dom';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class questionBank extends Component {
    constructor(props){
      super(props);
      this.state = {
        currentQuestion: []
      };     
    }
    componentDidMount() {
    this.props.fetchQuestionBank();
    }
    
    editButtonHandler(ques){
        this.setState({
            currentQuestion: ques
        })
    }
    render() {
      return (
        <div>
         <AddQuestion></AddQuestion>

        {this.props.questionsArr.length >0 ?     
        <table className="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Questions</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {               
                this.props.questionsArr.map((question) =>
                    <tr key={question._id}>
                    <td>{question.questionTxt}</td>
                    <td>
                    <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={(e)=>{
                     this.editButtonHandler(question);
                      this.props.showEditModalwindow();
                    }}></i>
                    <i className="fa fa-archive" aria-hidden="true" onClick={(e)=>{
                        this.props.deleteQuestion(question._id);
                    }}></i>
                    </td>
                   </tr>
               )
            }
        </tbody>
        </table>:null
        }
        {this.props.showEditQuestionModal ?
           <EditQuestion quesToEdit={this.state.currentQuestion}></EditQuestion>:null
        }
      </div>
      );
    }
  }


const mapStateToProps = (state) =>{
    return {
        questionsArr:state.questionBankReduer.questions,
        showEditQuestionModal: state.questionBankReduer.showEditModal
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        fetchQuestionBank:() =>{
            dispatch({type:'FETCH_QUESBANK'});
        },
        deleteQuestion:(id) =>{
            dispatch({type:'DELETE_QUESTION', idx:id})
        },
        showEditModalwindow:(id) =>{
            dispatch({type:'SHOW_EDIT_MODAL'})
        }

    }
}

const Question = connect(mapStateToProps, mapDispatchToProps)(questionBank);
export default Question;