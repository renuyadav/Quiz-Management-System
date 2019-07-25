import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditQuiz from './editQuiz';
import {Route} from 'react-router-dom'; 

class QuizBank extends Component{
    constructor(props){
        super(props);
        this.state = {
            quizArr : [],
            init:true
          }      
    }
    componentDidMount() {
        this.props.fetchQuizBank();
    }
    changeHandler(txt){
        let searchArr = this.props.quizArr.filter(quiz => {
            if(quiz.name.toLowerCase().indexOf((txt).toLowerCase()) > -1){
                return quiz;
        }});
        this.setState(
            {
                quizArr:searchArr,
                init:false
            }
        ); 
    }
    editButtonHandler(quiz){       
        this.props.editQuiz(quiz);
        this.props.history.push('/editQuiz');
    }
    createQuiz(){
        this.props.history.push('/addQuiz');
    }
    render(){
        let inputTxt; 
        let quizArray =[]
        {this.state.init?quizArray=this.props.quizArr:quizArray=this.state.quizArr
        }    
        return(                       
            <div>
            <input ref ={node => inputTxt= node } onChange={() => this.changeHandler(inputTxt.value)} className="input-search mBottom form-control" type="text" placeholder="Quiz Search" />
            <button className= "mBottom btn btn-primary" onClick ={() => this.createQuiz()}>Add Quiz</button>
            
            {quizArray.length > 0 ?     
                <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Quiz Name</th>
                        <th>Contact Number</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {               
                        quizArray.map((quiz) =>
                            <tr key={quiz._id}>
                            <td>{quiz.name}</td>
                            <td>{quiz.phone}</td>
                            <td>{quiz.createdAt.split("T")[0]}</td>
                            <td>
                            <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={(e)=>{
                            this.editButtonHandler(quiz);
                            }}></i>
                            <i className="fa fa-archive" aria-hidden="true" onClick={(e)=>{
                                this.props.deleteQuiz(quiz._id);
                            }}></i>
                            </td>
                        </tr>
                    )
                    }
                </tbody>
                </table>:null
         }
        </div>

            
        );

    }

}
const mapStateToProps = (state) =>{
    return {
        quizArr:state.quizBankReduer.quizes
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        fetchQuizBank:() =>{
            dispatch({type:'FETCH_QUIZBANK'});
        },
        deleteQuiz:(id) =>{
            dispatch({type:'DELETE_QUIZ', idx:id})
        },
        editQuiz:(quiz) =>{
            dispatch({type:'EDIT_QUIZ', payload:quiz})
        }
    }
}

const Quizes = connect(mapStateToProps, mapDispatchToProps)(QuizBank);

export default Quizes;
