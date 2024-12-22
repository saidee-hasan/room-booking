
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import RoomDetails from "../components/RoomDetails";
import Rooms from "../components/Rooms";
import MyBooking from "../components/MyBooking";





const router =  createBrowserRouter([
    {path:"/",element:<MainLayout/>,children:[

        {path:"/",element:<Home/>},
        {path:"/rooms",element:<Rooms/>},
        {path:"/my-bookings",element:<MyBooking/>},
        {path:"/rooms/:id",element:<RoomDetails/>  ,loader:({params})=> fetch(`http://localhost:5000/rooms/${params.id}`)},
        
       

    ]},
  
   

])
export default router;