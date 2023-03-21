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
import MyPage from './components/MyPage';

// Authentication Hook
import Auth from './hoc/auth';


function App() {
  const AuthHomePage = Auth(Home, null);
  const AuthLoginPage = Auth(Login, false);
  const AuthRegisterPage = Auth(Register, false);
  const AuthMyPage = Auth(MyPage, true);
  const AuthLearning = Auth(Learning, true);


  return (
    <>
      <Routes>
        <Route path="/" element={<AuthHomePage />} />
        <Route path="/learning" element={<AuthLearning />}></Route>
        <Route exact path="/learning/:videoId" element={<AuthLearning />}></Route>
        <Route path="/dictionary" element={<Dictionary />}></Route>
        
        <Route path="/register" element={<AuthRegisterPage />} />
        <Route path="/login" element={<AuthLoginPage />} />
        // Auth 처리 필요
        <Route path="/my-page" element={<AuthMyPage />}></Route>
    
      </Routes>
      
      <Navigation />
    </>
  );
}

export default App;