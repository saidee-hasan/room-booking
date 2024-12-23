
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import RoomDetails from "../components/RoomDetails";
import Rooms from "../components/Rooms";
import MyBooking from "../components/MyBooking";
import Register from "../components/Registar";





const router =  createBrowserRouter([
    {path:"/",element:<MainLayout/>,children:[

        {path:"/",element:<Home/>},
        {path:"/register",element:<Register/>},
        {path:"/rooms",element:<Rooms/>},
        {path:"/my-bookings",element:<MyBooking/>},
        {path:"/rooms/:id",element:<RoomDetails/>  ,loader:({params})=> fetch(`http://localhost:5000/rooms/${params.id}`)},
        
       

    ]},
  
   

])
export default router;