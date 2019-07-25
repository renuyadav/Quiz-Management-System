import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; 

class AddQuizForm extends Component{
    constructor(props){
        super(props);
    }
    handleFormSubmit(evt){
        evt.preventDefault();
        let form = evt.target;
        let selectedQuestion =[];
  
        // var selectedQuestion = Array.prototype.slice.call(form.selectedQues).filter(input => {if(input.checked){return input.id}})
         for (let input of form.selectedQues) {
          if(input.checked) selectedQuestion.push(input.id);
          
        }
          var formData = {
            name:form.quizName.value,
            description:form.quizDesc.value,
            phone:parseInt(form.phone.value),
            questions:selectedQuestion
          };
          this.props.addNewQuiz(formData);
    }
    render(){
        return(
            <div>
                {this.props.isAdded ?<Redirect to='/Quizes' />:null }
          
            <form id="addQuizForm" className="form-horizontal" onSubmit={(evt) => this.handleFormSubmit(evt)}>  
                <h4>Create Quiz</h4>
                <div className="form-group">
                    <input type="text" className="form-control quiz-name" placeholder="Quiz Name" name="quizName"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control quiz-desc" placeholder="Quiz Description/Purpose" name="quizDesc"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control quiz-phone" placeholder="Phone Number" name="phone"/>
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
                        this.props.questionsArr.map((question) =>
                            <tr key={question._id}>
                            <td>{question.questionTxt}</td>
                            <td>
                            <div className="form-group">  
                                <input id={question._id} type="checkbox" className="isSelect" name="selectedQues" value=""/>
                            </div>
                            </td>
                        </tr>
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
      isAdded:state.quizBankReduer.isAdded,
      questionsArr:state.questionBankReduer.questions
    }
  }
  const mapDispatchToProps = dispatch =>{
    return {
        addNewQuiz:(data) => dispatch({type:'ADD_NewQuiz', payload:data})
    }
  }
  const AddQuiz = connect(mapStateToProps, mapDispatchToProps)(AddQuizForm);
  export default AddQuiz;