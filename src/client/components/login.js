import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            errors : []
        }
       
    }
    componentDidMount() {
        this.props.initUser();
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
            email:form.email.value,
            password:form.password.value
          };
        console.log("handle login form>>" + user +"::"+ user.email);
        this.props.loginClient(user, this.props.history);
    }
    render(){
        const { errors } = this.state;
        return(
            <div className="login container">
                <h2>Login to your account</h2>
                <form id="loginForm" className="form-horizontal" onSubmit={(evt) => this.handleFormSubmit(evt)}> 
                <div className="form-group">
                    <input type="text" className="form-control" id="email" placeholder="Email" name="email"/>
                    {errors.email ? (<div className="invalid-feedback">{errors.email}</div>):null}
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password"/>
                    {errors.password ? (<div className="invalid-feedback">{errors.password}</div>):null}
                </div>
                <div className="btns-groupe">
                <button  className="btn btn-primary" type="submit">Login</button>
                <button className="btn btn-primary" type="button" onClick={() =>this.props.history.push('/register')}>Register</button>
                </div>
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
        loginClient:(data,history) => dispatch({type:'LOGIN_CLIENT', payload:{data:data, history:history}}),
        initUser:() => dispatch({type:'SET_CURRENT_USER'})

    }
  }
const Login = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default Login;