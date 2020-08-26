import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import './App.css'
import { HashRouter } from 'react-router-dom'

import Footer from './components/templates/Footer'
import Nav from './components/templates/Nav'
import Logo from './components/templates/Logo'
import Routes from './Routes'

export default props =>
    <HashRouter>
    <div className="app">
        <Logo />
        <Nav />
        <Routes />
        <Footer />
    </div>
    </HashRouter>