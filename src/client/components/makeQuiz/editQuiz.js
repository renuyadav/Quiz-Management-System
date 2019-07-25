import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; 

class EditQuizForm extends Component{
    constructor(props){
        super(props);
    }
    checkAlreadySelected(id){
        var result = this.props.quizToEdit.questions.filter(ques => ques === id);
        return result;
    }
    handleFormSubmit(evt){
        evt.preventDefault();
        let form = evt.target;
        let selectedQuestion =[];
  
        for (let input of form.selectedQues) {
          if(input.checked) selectedQuestion.push(input.id);
          
        }
          var formData = {
            name:form.quizName.value,
            description:form.quizDesc.value,
            phone:parseInt(form.phone.value),
            questions:selectedQuestion,
            _id:this.props.quizToEdit._id

          };
          this.props.updateQuiz(formData);
    }
    render(){
        return(
            <div>
                {this.props.isAdded ?<Redirect to='/Quizes' />:null }
          
            <form id="editQuizForm" className="form-horizontal" onSubmit={(evt) => this.handleFormSubmit(evt)}>  
                <h4>Edit Quiz</h4>
                <div className="form-group">
                    <input type="text" className="form-control quiz-name" defaultValue={this.props.quizToEdit.name} placeholder="Quiz Name" name="quizName"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control quiz-desc" defaultValue={this.props.quizToEdit.description} placeholder="Quiz Description/Purpose" name="quizDesc"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control quiz-phone" defaultValue={this.props.quizToEdit.phone} placeholder="Phone Number" name="phone"/>
                </div>
                {this.props.questionsArr.length > 0 ?          
                <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Questions</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {               
                        this.props.questionsArr.map((question) => {
                        var result = this.checkAlreadySelected(question._id);
                       return <tr key={question._id}>
                            <td>{question.questionTxt}</td>
                            <td>
                            <div className="form-group">  
                                <input id={question._id} type="checkbox" defaultChecked={result.length} className="isSelect" name="selectedQues" value=""/>
                            </div>
                            </td>
                        </tr>
                        }
                        )
                    }
                </tbody>
                </table>:null
                }
            <button  className="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
      quizToEdit: state.quizBankReduer.quizToEdit,
      isAdded:state.quizBankReduer.isAdded,
      questionsArr:state.questionBankReduer.questions
    }
  }
  const mapDispatchToProps = dispatch =>{
    return {
        updateQuiz:(data) => dispatch({type:'UPDATE_QUIZ', payload:data})
    }
  }
  const EditQuiz = connect(mapStateToProps, mapDispatchToProps)(EditQuizForm);
  export default EditQuiz;