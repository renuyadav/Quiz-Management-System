var initialState ={currentUser:'', errors:[]};

const user = (state=initialState, action) =>{
    switch(action.type){
        case "REGISTER_NEW_CLIENT_SUCCESS":
        console.log("regoister success>>" + action.payload);
        return{
            ...state, currentUser:action.payload, errors:[] 
        }
        case "LOGIN_SUCCESS":
        console.log("login success>>" + action.payload);
        return{
            ...state, currentUser:action.payload, errors:[]
        }
        case "GET_ERRORS":
        return {
            ...state,
            errors:action.payload,
        }
        case "SET_CURRENT_USER":
        return{
            ...state, currentUser:"", errors:[] 
        }
        default:
        return state;
    }
}

export default user;