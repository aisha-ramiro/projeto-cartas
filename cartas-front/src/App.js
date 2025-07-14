import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Carta from './Pages/Carta';
import Usuario from './Pages/Usuario';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import User from './Pages/User';
import LandingPage from './Pages/LandingPage';
import AdminPanel from './Pages/AdminPanel';
import Endereco from './Pages/Endereco';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login');

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setView('login');
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} />
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {token ? (
            <>
              <Route path="/nova-carta" element={<Carta token={token} />} />
              <Route path="/usuario/*" element={<Usuario token={token} />} />
              <Route path="/user" element={<User token={token} />} />
              <Route path="*" element={<Navigate to="/nova-carta" />} />
              <Route path="/admin" element={<AdminPanel token={token} />} />
              <Route path="/endereco" element={<Endereco />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={
                  view === 'register' ? (
                    <Register onSwitch={() => setView('login')} onRegister={() => setView('login')} />
                  ) : (
                    <Login onLogin={handleLogin} onSwitch={() => setView('register')} />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
