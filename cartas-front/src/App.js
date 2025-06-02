import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Carta from './Pages/Carta';
import Usuario from './Pages/Usuario';
import './App.css';

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
      <div className="App">
        <h1>Cartas Vintage</h1>
        {token ? (
          <>
            <button onClick={handleLogout}>Sair</button>
            <Routes>
              <Route path="/" element={<Carta token={token} />} />
              <Route path="/usuario/*" element={<Usuario token={token} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route
                path="/"
                element={
                  view === 'register' ? (
                    <Register onSwitch={() => setView('login')} onRegister={() => setView('login')} />
                  ) : (
                    <Login onLogin={handleLogin} onSwitch={() => setView('register')} />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
