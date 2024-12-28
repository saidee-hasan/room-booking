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
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/NotFound";
import ForgotPassword from "../components/ForgotPassword";
import About from "../components/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <NotFound /> },
      { path: "/about", element: <About /> },
      { path: "forgot-password", element: <ForgotPassword /> },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UserProfile />{" "}
          </PrivateRoute>
        ),
      },
      { path: "/register", element: <Register /> },
      {
        path: "/update",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/rooms", element: <Rooms /> },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBooking />
          </PrivateRoute>
        ),
      },
      {
        path: "/rooms/:id",
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://room-booking-server-ten.vercel.app/rooms/${params.id}`
          ),
      },
    ],
  },
]);
export default router;
