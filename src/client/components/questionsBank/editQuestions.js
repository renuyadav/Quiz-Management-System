import React, {Component} from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';

class EditQuestionForm extends Component{
    constructor(props){
        super(props);
        console.log("editques comp called>>" + props.showEditQuestionModal+"::"+ props.quesToEdit);
        this.state = {
          answOptions : props.quesToEdit.options
        }
    }
    addOptions(answer){
      this.setState(
        {
          answOptions:[...this.state.answOptions,[]]
        }
      )     
    }
    deleteOptions(txt){
      var deleteAns = this.state.answOptions.filter(ans => ans.val !== txt); // Use filter method to remove the item that has been deleted from the list
      
      this.setState(
        {
          answOptions:deleteAns
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

      console.log("edit ahndle form submit>>" + options);

      var formData = {
        category:[],
        _id:this.props.quesToEdit._id,
        questionTxt:form.quesTxt.value,
        options:options,
        isMultiple:isMultiple,
        time:parseInt(form.timerTxt.value)
      };

      this.props.editNewQuestion(formData);   
    }
    render(){
    return (
    <div>
       <Modal isOpen={true}>
       <form id="editQuestionForm" className="form-horizontal" onSubmit={(evt) => this.handleFormSubmit(evt)}>  
          <ModalHeader>Edit Question</ModalHeader>
          <ModalBody>
          <div className="form-group">
            <input type="text" className="form-control" defaultValue={this.props.quesToEdit.questionTxt} id="ques" placeholder="Enter Question Text" name="quesTxt"/>
          </div>
          <div className="form-group">
          <select defaultValue={this.props.quesToEdit.time} className="form-control quesTimer" name="timerTxt">
              <option value="10">10 Sec</option>
              <option value="30">30 Sec</option>
              <option value="60">60 Sec</option>
          </select>
          </div>
          
          <button  className="btn-add-options btn btn-primary" type="button" onClick={(evt) => this.addOptions()}>Add Options</button>{' '}
          {
            this.state.answOptions.map((ans,i) =>
            <div key ={i} className="form-group">  
              <input type="text" defaultValue={ans.val} className="form-control col-10 quesOptions"  placeholder={"Answer"} name={"answers"}/>
              <input type="checkbox" className="isAnswer" name="isAnswer" defaultChecked={ans.isAnswer}/>
              <i className="fa fa-times delete-icon"onClick= {(evt) =>{this.deleteOptions(ans.val)}}></i>
           </div>
           )
          } 
          </ModalBody>
          <ModalFooter>
            <button  className="btn btn-primary" type="submit">Submit</button>{' '}
            <button  className="btn btn-primary"  type="button" onClick={() => this.props.hideEditModalwindow()}>Cancel</button>
          </ModalFooter>
          </form>
        </Modal>


    </div>   
    );
  } 
}

const mapStateToProps = (state) =>{
  return {
      showEditQuestionModal: state.questionBankReduer.showEditModal
  }
}
const mapDispatchToProps = dispatch =>{
  return { 
      hideEditModalwindow:() => dispatch({type:'HIDE_EDIT_MODAL'}),
      editNewQuestion:(data) => dispatch({type:'EDIT_Question', payload:data})
  }
}
const EditQuestion = connect(mapStateToProps, mapDispatchToProps)(EditQuestionForm);
export default EditQuestion;