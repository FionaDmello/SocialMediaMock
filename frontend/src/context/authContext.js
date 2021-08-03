import { createContext,useReducer } from "react";
import AuthReducer from "./authReducer";

const INITIAL_STATE ={
    user: null,
    isFetching: false,
    error: false
};

export const AuthContext =  createContext(INITIAL_STATE);

// Provider wrapper to reach and maintain important variables from all parts of the app
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return(
        <AuthContext.Provider 
        value={{
            user:state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
}