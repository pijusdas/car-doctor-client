import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SIgnUp/SignUp";
import CheckOut from "../pages/checkOut/checkOut";
import Booking from "../pages/Booking/Booking";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
      path: "/",
      element:  <Main></Main>,
      children: [
        {
            path:'/',
            element: <Home></Home>
        }, 
        {
            path: 'login',
            element: <Login></Login>
        }, 
        {
            path: '/signUp',
            element: <SignUp></SignUp>
        },
        {
            path: '/checkout/:id',
            element:<PrivateRoutes><CheckOut></CheckOut></PrivateRoutes>,
            loader: ({params})=> fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
            path: '/bookings',
            element: <PrivateRoutes> <Booking></Booking></PrivateRoutes>
        }
      ]

    },
  ]);

  export default router