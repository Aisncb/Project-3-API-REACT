import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/Login/Login";
import Root from "../layouts";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Signup/SignUp";
import ListBookings from "../pages/ListBookings/ListBookings";
import ListUsersPage from "../pages/Users/ListUsers/ListUsersPage";
import ListEquipment from "../pages/Equipment/ListEquipment/ListEquipment";
import AddEquipment from "../pages/Equipment/AddEquipment/AddEquipment";
import UpdateEquipment from "../pages/Equipment/UpdateEquipment/UpdateEquipment";
import DeleteEquipment from "../pages/Equipment/DeleteEquipment/DeleteEquipment";
import CreateUserPage from "../pages/Users/CreateUser/CreateUserPage";
import ListClassrooms from "../pages/Classroom/ListClassrooms/ListClassrooms";
import AddClassroom from "../pages/Classroom/AddClassroom/AddClassroom";
import UpdateClassroom from "../pages/Classroom/UpdateClassroom/UpdateClassroom";
import DeleteClassroom from "../pages/Classroom/DeleteClassroom/DeleteClassroom";
import NotFound from "../pages/NotFound/NotFound";
import ListBuildings from "../pages/Building/ListBuildings/ListBuildings";
import AddBuilding from "../pages/Building/AddBuilding/AddBuilding";
import UpdateBuilding from "../pages/Building/UpdateBuilding/UpdateBuilding";
import DeleteBuilding from "../pages/Building/DeleteBuilding/DeleteBuilding";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
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
    path: "/dashboard/",
    element: <Root />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/"); //If the user isn't logged in, we redirect to the login page.
      } else {
        return null;
      }
    },
    children: [
      {
        path: '/dashboard/listBookings',
        element: <ListBookings />,
      },
      {
        path: "/dashboard/listUsers",
        element: <ListUsersPage />,
      },
      {
        path: "/dashboard/createUser",
        element: <CreateUserPage />,
      },
      {
        path: "/dashboard/listEquipment",
        element: <ListEquipment />,
      },
      {
        path: "/dashboard/addEquipment",
        element: <AddEquipment />,
      },
      {
        path: "/dashboard/updateEquipment",
        element: <UpdateEquipment />,
      },
      {
        path: "/dashboard/deleteEquipment",
        element: <DeleteEquipment />,
      },
      {
        path: '/dashboard/listClassrooms',
        element: <ListClassrooms />
      },
      {
        path: '/dashboard/addClassroom',
        element: <AddClassroom />
      },
      {
        path: '/dashboard/updateClassroom',
        element: <UpdateClassroom />
      },
      {
        path: '/dashboard/deleteClassroom',
        element: <DeleteClassroom />
      },
      {
        path: '/dashboard/listBuildings',
        element: <ListBuildings />
      },
      {
        path: '/dashboard/addBuilding',
        element: <AddBuilding />
      },
      {
        path: '/dashboard/updateBuilding',
        element: <UpdateBuilding />
      },
      {
        path: '/dashboard/deleteBuilding',
        element: <DeleteBuilding />
      },
    ],
  },
]);
