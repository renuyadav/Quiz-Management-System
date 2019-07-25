import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            errors : []
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    handleFormSubmit(evt){
        evt.preventDefault();
        var form = evt.target;
        console.log("handle form submit called");
        var user = {
            name:form.name.value,
            userName: form.userName.value,
            email:form.email.value,
            password:form.password.value
          };
        console.log("handle Registeration form>>" + user +"::"+ this.props.history);
        this.props.registerClient(user, this.props.history);
    }
    render(){
        const { errors } = this.state;
        return(
            <div className="register-client container">
                <h2>Register your account</h2>
                <form id="registerClientForm" className="form-horizontal" onSubmit={(evt) => this.handleFormSubmit(evt)}> 
                <div className="form-group">
                    <input type="text" className="form-control" id="name" placeholder="Name" name="name"/>
                    {errors.name ? (<div className="invalid-feedback">{errors.name}</div>):null}
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="userName" placeholder="User Name" name="userName"/>
                    {errors.userName ? (<div className="invalid-feedback">{errors.userName}</div>):null}
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="email" placeholder="Email" name="email"/>
                    {errors.email ? (<div className="invalid-feedback">{errors.email}</div>):null}
       
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password"/>
                    {errors.password ? (<div className="invalid-feedback">{errors.password}</div>):null}
                </div>                
                <button  className="align-center btn btn-primary" type="submit">Register</button>                
                </form> 
            </div>
        );
    }
}
const mapStateToProps = state => ({
    errors: state.user.errors
});
const mapDispatchToProps = dispatch =>{
    return { 
        registerClient:(data, history) => dispatch({type:'REGISTER_CLIENT', payload:{data:data, history:history}})
    }
}
const RegisterClient = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

export default RegisterClient;