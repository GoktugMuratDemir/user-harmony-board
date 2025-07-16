import { createBrowserRouter } from "react-router-dom";
import UserList from "../Pages/User/UserList";
import UserDetail from "../Pages/User/UserDetail";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/users/:id",
    element: <UserDetail />,
  },
]);

export default routes;
