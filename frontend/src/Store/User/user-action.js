import axios from "axios";
import {userActions} from "./user-slice";

//handle user Signup
export const getSignUp =(user) => async(dispatch) =>{
    try{
        dispatch(userActions.getSignupRequest());
        const {data} = await axios.post("/api/v1/rent/user/signup", user);

        dispatch(userActions.getSignupDetails(data.user));
    } catch(error) {
        dispatch(userActions.getError(error.response.data.message));
    }
};

//handle user login
export const getLogIn =(user)=> async(dispatch)=>{
    try{
        dispatch(userActions.getLoginRequest());
        const {data}= await axios.post("/api/v1/rent/user/login",user);
        if(data.success && data.user){
        dispatch(userActions.getLoginDetails(data.user));
        }else {dispatch(userActions.getError("Invalid login credentials"));

        }
    } catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

//get current user information

export const currentUser =() => async(dispatch)=>{
    try{
        dispatch(userActions.getCurrentUserRequest());
        const {data}= await axios.get("/api/v1/rent/user/me");
        dispatch(userActions.getCurrentUser(data.user));
    } catch(error) {
        dispatch(userActions.getError(error.response.data.message));
    }
};

// to update user information
export const updateUser = (updateUser) => async(dispatch) => {
    try{
        dispatch(userActions.getUpdateUserRequest());
        await axios.patch("/api/v1/rent/user/updateMe", updateUser);
        const {data}= await axios.get("/api/v1/rent/user/me");
        dispatch(userActions.getCurrentUser(data.user));
    }catch (error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

//to handle forgot password

export const forgotPassword =(email) => async(dispatch)=>{
    try{
        await axios.post("/api/v1/rent/user/forgotPassword", {email});
} catch(error) {
    dispatch(userActions.getError(error.response.data.message));
}
};

//password reset
export const resetPassword = (resetpassword, token)=> async (dispatch)=>{
    try{
        await axios.patch(`/api/v1/rent/user/resetPassword/${token}`, resetpassword);
        }catch(error){
            dispatch(userActions.getError(error.response.data.message));
        }
};

//password update
export const updatePassword =(passwords)=> async(dispatch)=>{
    try{
        dispatch(userActions.getPasswordRequest());
        await axios.patch("/api/v1/rent/user/updateMyPassword", passwords);
        dispatch(userActions.getPasswordSuccess(true))
    }catch(error){
        dispatch(userActions.getError(error.response.data.message));
    }
};

//user logout
export const Logout =() => async(dispatch) =>{
    try{
        await axios.get("/api/v1/rent/user/logout");
        localStorage.removeItem("token");
        dispatch(userActions.logout());
        
    } catch(error){
        dispatch(userActions.getError(error.response?.data?.message || "Logout Failed"));
    }
};