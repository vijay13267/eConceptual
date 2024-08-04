import { IS_USER_LOGGED_IN,SET_TOKEN,SET_USER_DETAILS } from "../actionTypes";

export const setUserLoginStatus = (user_logged_in) => ({ 
    type: IS_USER_LOGGED_IN, 
    payload: user_logged_in 
});

export const setToken = (token) => ({ 
    type: SET_TOKEN, 
    payload: token 
});

export const setUserDetails = (userDetails) => ({
    type: SET_USER_DETAILS, 
    payload: userDetails 
})