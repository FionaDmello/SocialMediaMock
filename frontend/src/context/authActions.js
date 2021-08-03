// actions to be taken on the context state maintained in this app
// this is where we control how params in the state are to be updated, if and when required

export const LoginStart = (userCreds) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error,
});