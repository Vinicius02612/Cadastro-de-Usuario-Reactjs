import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'



//importando os componentes da aplicaçao
import Logo from '../components/tamplet/Logo'
import Nav from '../components/tamplet/Nav'
//import Home from '../components/home/Home'
import Routes from './Routes'
import Footer from '../components/tamplet/Footer'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>
