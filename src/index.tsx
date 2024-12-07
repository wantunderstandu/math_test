import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TorusKnotGeometry from './Component/TorusKnotGeometry';
import Klein from './Component/Klein';
import NotFound from './APP/NotFound';
import Main from './APP/Main';
import Introduction from './Component/Introduction';
import Cylinder from './Component/Cylinder';
import Test from './APP/Test';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router >
    <Routes>
      <Route path="/" element={<Main Main_Content={<Introduction/>} />} />
      
      <Route path='/cylinder' element={<Main Main_Content={<Cylinder/>} />} />
      <Route path='/Klein' element={<Main Main_Content={<Klein/>}></Main>} />
      <Route path="/torusKnotGeometry" element={<TorusKnotGeometry/>} />
      <Route path="/test" element={<Test/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  </Router>
)

