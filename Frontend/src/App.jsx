import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigate,  Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home';
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/home" element={<Home />} />
        <Route
        path="/"
        element={
          localStorage.getItem("chat-username") ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />
      
      </Routes>
    </Router>
  )
}

export default App
