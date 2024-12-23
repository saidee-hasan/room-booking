
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import RoomDetails from "../components/RoomDetails";
import Rooms from "../components/Rooms";
import MyBooking from "../components/MyBooking";
import Register from "../components/Registar";
import Login from "../components/Login";
import UserProfile from "../components/UserProfile";
import UpdateProfile from "../components/UpdateProfile";





const router =  createBrowserRouter([
    {path:"/",element:<MainLayout/>,children:[

        {path:"/",element:<Home/>},
        {path:"/profile",element:<UserProfile/> },
        {path:"/register",element:<Register/>},
        {path:"/update",element:<UpdateProfile/> },
        {path:"/login",element:<Login/>},
        {path:"/rooms",element:<Rooms/>},
        {path:"/my-bookings",element:<MyBooking/>},
        {path:"/rooms/:id",element:<RoomDetails/>  ,loader:({params})=> fetch(`http://localhost:5000/rooms/${params.id}`)},
        
       

    ]},
  
   

])
export default router;