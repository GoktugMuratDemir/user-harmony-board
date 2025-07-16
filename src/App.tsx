
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import UserListPage from './pages/UserListPage';
import UserDetailPage from './pages/UserDetailPage';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App
