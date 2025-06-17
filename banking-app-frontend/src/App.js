// App.js

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path="/" element={<h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Welcome to BankApp</h2>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
export default App;