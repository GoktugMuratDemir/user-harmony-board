import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home";
import UserList from "../Pages/User/UserList";
import UserDetail from "../Pages/User/UserDetail";
import DashboardLayout from "../Layouts/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />, // Layout route
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "users/:id",
        element: <UserDetail />,
      },
    ],
  },
]);

export default routes;
