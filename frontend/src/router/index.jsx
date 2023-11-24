import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/Login/Login";
import Root from "../layouts";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Signup/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import ListBookings from "../pages/Booking/ListBookings/ListBookings";
import ListMyBookings from "../pages/Booking/ListMyBookings/ListMyBookings";
import AddBooking from "../pages/Booking/AddMyBooking/AddMyBooking";
import UpdateMyBooking from "../pages/Booking/UpdateMyBooking copy/UpdateMyBooking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Root />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/")  //If the user isn't logged in, we redirect to the login page.
      } else {
        return null;
      }
    },
    children: [
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/dashboard/listbookings',
        element: <ListBookings/>
      },
      {
        path: '/dashboard/listmybookings',
        element: <ListMyBookings/>
      },
      {
        path: '/dashboard/addmybooking',
        element: <AddBooking/>
      }
      ,
      {
        path: '/dashboard/updatemybooking',
        element: <UpdateMyBooking/>
      }
    ],
  },
]);
