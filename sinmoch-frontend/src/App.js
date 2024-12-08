import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Formulario from './components/Formulario';
import CiudadanoView from './components/CiudadanoView';
import Autoridad from './components/Autoridad';
import Reporte from './components/Reporte';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Formulario />} />
                <Route path="/ciudadano" element={<CiudadanoView />} />
                <Route path="/autoridad" element={<Autoridad />} />
                <Route path="/reporte" element={<Reporte />} />
            </Routes>
        </Router>
    );
};

export default App;
