// reducer of the context state maintained in this app
// this is where we control what params in the state are to be updated, if and when required

const AuthReducer = (state,action) => {
    switch(action.type){
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error: false
            };
            case "LOGIN_FAILURE":
        return{
            user: null,
            isFetching: false,
            error: action.payload
        };

        default:
                return state
    }
}

export default AuthReducer;