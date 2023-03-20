//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import React from "react";

import Navigation from './components/Navigation';
import Home from './components/Home';
import Learning from './components/Learning/Learning';
import Dictionary from './components/Dictionary';
import Register from './components/Register';
import Login from './components/Login';

// Authentication Hook
import Auth from './hoc/auth';


function App() {
  const AuthHomePage = Auth(Home, null);
  const AuthLoginPage = Auth(Login, false);
  const AuthRegisterPage = Auth(Register, false);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthHomePage />} />
        <Route path="/learning" element={<Learning />}></Route>
        <Route exact path="/learning/:videoId" element={<Learning />}></Route>
        <Route path="/dictionary" element={<Dictionary />}></Route>
        
        <Route path="/register" element={<AuthRegisterPage />} />
        <Route path="/login" element={<AuthLoginPage />} />
    
      </Routes>
      
      <Navigation />
    </>
  );
}

export default App;