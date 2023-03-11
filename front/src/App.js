//import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
//import Footer from './components/Footer';
import LearningMain from './components/LearningMain';
import Learning from './components/Learning/Learning';
//import Quiz from './components/Quiz';
import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom'
import React from "react";


function App() {

  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning" element={<LearningMain />}></Route>
        <Route path="/learning/:videoId" element={<Learning />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
    
      </Routes>

    </>
  );
}

export default App;