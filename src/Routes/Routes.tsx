import { createBrowserRouter } from 'react-router-dom';
import UserListPage from '../pages/UserListPage';
import UserDetailPage from '../pages/UserDetailPage';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <UserListPage />,
  },
  {
    path: '/users/:id',
    element: <UserDetailPage />,
  },
]);

export default routes;
