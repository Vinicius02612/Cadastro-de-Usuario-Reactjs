import './Nav.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="./">
                <i className ="fa fa-home"></i>Inicio
            </Link>
            <Link to="/user">
                <i className ="fa fa-user"></i>Usuarios
            </Link>
            {/* <Link to="./contatos">
                <i className ="fa fa-address-card-o"></i>Contatos
            </Link>
            <Link to="./quem-somos">
                <i className ="fa fa-question-circle"></i>Quem somos
            </Link> */}
        </nav>
    </aside>