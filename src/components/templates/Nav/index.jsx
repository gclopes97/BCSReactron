import './style.css'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <a href="#/">
                <i className="fa fa-home"></i>Início
            </a>
            <a href="#/backup">
                <i className="fa fa-list"></i>Backups
            </a>
        </nav>
    </aside>