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


function App() {

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
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;