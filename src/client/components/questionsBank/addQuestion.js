import React, {Component} from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';

class AddQuestionForm extends Component{
    constructor(props){
        super(props);
        this.state = {
          answOptions : 0
        }
    }
    addOptions(){
      this.setState(
        {
          answOptions:this.state.answOptions + 1
        }
      )     
    }
    deleteOptions(){
      this.setState(
        {
          answOptions:this.state.answOptions - 1
        }
      )     
    }
    
    handleFormSubmit(evt){
      evt.preventDefault();
      let options=[];
      let form = evt.target;//document.getElementById('addQuestionForm');
      let counter =0,
          isMultiple = false;
      //iterate over the answer options
      for (var i = 0; i < form.answers.length; i++) {
        options.push({val:form.answers[i].value, isAnswer:form.isAnswer[i].checked});
        if(form.isAnswer[i].checked)  ++counter;
      }
      if(counter>1) isMultiple = true;

      var formData = {
        category:[],
        questionTxt:form.quesTxt.value,
        options:options,
        isMultiple:isMultiple,
        time:parseInt(form.timerTxt.value)
      };
      this.props.addNewQuestion(formData);
      form.reset();
    
    }
    render(){
    return (
    <div>
       <button className= "mBottom btn btn-primary" onClick ={() => this.props.showAddQuestionModalWindow()}>Add</button>
       <Modal isOpen={this.props.showAddQuestionModal}>
       <form id="addQuestionForm" className="form-horizontal" onSubmit={(evt) => this.handleFormSubmit(evt)}>  
          <ModalHeader>Add Question</ModalHeader>
          <ModalBody>
          <div className="form-group">
            <input type="text" className="form-control" id="ques" placeholder="Enter Question Text" name="quesTxt"/>
          </div>
          <div className="form-group">
          <select className="form-control quesTimer" name="timerTxt">
              <option value="10">10 Sec</option>
              <option value="30">30 Sec</option>
              <option value="60">60 Sec</option>
          </select>
          </div>
          
          <button  className="btn-add-options btn btn-primary" type="button" onClick={(evt) => this.addOptions()}>Add Options</button>{' '}
          {
            Array(this.state.answOptions).fill().map((_,i) => 
            <div key ={i} className="form-group">  
              <input type="text" className="form-control col-10 quesOptions"  placeholder={"Answer"} name={"answers"}/>
              <input type="checkbox" className="isAnswer" name="isAnswer" value=""/>
              <i className="fa fa-times delete-icon"onClick= {(evt) =>{this.deleteOptions()}}></i>
           </div>
           )
          } 
          </ModalBody>
          <ModalFooter>
            <button  className="btn btn-primary" type="submit">Submit</button>{' '}
            <button  className="btn btn-primary" type="button" onClick={() => this.props.hideAddQuestionModalWindow()}>Cancel</button>
          </ModalFooter>
          </form>
        </Modal>


    </div>   
    );
  } 
}
const mapStateToProps = (state) =>{
  return {
      showAddQuestionModal:state.questionBankReduer.showAddQuestionModal
  }
}
const mapDispatchToProps = dispatch =>{
  return {
      showAddQuestionModalWindow:() => dispatch({type:'SHOW_ADD_QUES_MODAL'}),      
      hideAddQuestionModalWindow:() => dispatch({type:'HIDE_ADD_QUES_MODAL'}),
      addNewQuestion:(data) => dispatch({type:'ADD_NewQuestion', payload:data})
  }
}
const AddQuestion = connect(mapStateToProps, mapDispatchToProps)(AddQuestionForm);
export default AddQuestion;