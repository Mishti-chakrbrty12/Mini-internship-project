import "./App.css";


import{
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,}

  from"react-router-dom";
import Main from "./Components/Home/Main";
import PropertyList from "./Components/Home/PropertyList";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import Login from "./Components/User/Login";
import {Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "./Store/User/user-slice";
import { currentUser } from "./Store/User/user-action";
import "leaflet/dist/leaflet.css";
import Signup from "./Components/User/Signup";
import Profile from "./Components/User/Profile";
import EditProfile from "./Components/User/EditProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import { toast } from "react-toastify";
import Payment from "./Components/Payment/Payment";
import {Elements } from "@stripe/react-stripe-js";
import{loadStripe} from "@stripe/stripe-js";
import MyBookings from "./Components/Mybookings/MyBookings";
import BookingDetails from "./Components/Mybookings/BookingDetails";
import AccomodationForm from "./Components/Accomodation/AccomodationForm";
import Accomodation from "./Components/Accomodation/Accomodation";

function App() {
const stripePromise= loadStripe(
  "pk_test_51ReBEPRB5aMBQnsgfHK4bfOQsxyG5SxOxBx8gCtOTFUhF6lTbT109WAtYINM5eEteZwzKYVDyBG1x0mEuwodBrtU00rTTw8tFS")
  const dispatch =useDispatch();
  const {errors} = useSelector((state)=> state.user);
  useEffect(()=>{
    if(errors){
      dispatch(userActions.clearError());
    }
    dispatch(currentUser());
  }, [errors,dispatch]);

  //manages the routing configuration for the application
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main/>} id="main"exact>
        <Route id="home" index element={<PropertyList/>} exact/>
        <Route element={<PropertyDetails/>} id="PropertyDetails" path="propertylist/:id" exact/>
        <Route id="login"
        path="login"
        element={<Login/>} />
        <Route id="signup" path="signup" element={<Signup/>}/>
        <Route id= "profile" path="profile" element={<Profile/>}/>
        <Route id="editprofile" path="editprofile" element={<EditProfile/>}/>
        <Route id="updatepassword" path="user/updatepassword" element={<UpdatePassword/>}/>
        <Route id="forgotpassword" path="user/forgotpassword" element={<ForgotPassword/>}/>
        <Route id="resetpassword" path="user/resetPassword/:token" element= {<ResetPassword/>}/>
        <Route id="payment" path="payment/:propertyId" element={<Elements stripe={stripePromise}>
          <Payment/>
        </Elements>}/>
        <Route id="mybookings" path="user/booking" element={<MyBookings/>}/>
        <Route id="bookingdetails" path="user/booking/:bookingId" element={<BookingDetails/>}/>
        <Route id="accomodation" path="accommodation" element={<Accomodation/>}/>
        <Route id="accomodationform" path="accomodationform" element={<AccomodationForm/>}/>


        
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer
      position="bottom-centre"
      autoClose={3000}
      draggable={true}
      transition={Flip}/>
    </div>
  );
}

export default App;