import React, { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Collapse,
    NavLink,
    NavbarToggler
} from 'reactstrap'

import { Link } from "react-router-dom";


// componente cabecalho
const Header = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }

    return (
        <Navbar color="light" light expand="md">
            <div className="container">
                <NavbarBrand tag={Link} to="/">Minhas Séries</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={open} navbar>
                    <Nav className="ml-Auto" navbar>
                        <NavItem >
                            <NavLink tag={Link} to="/series">Séries</NavLink>
                        </NavItem>
                        <NavItem >
                            <NavLink tag={Link} to="/generos">Genêros</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    )
}
export default Header;
// axios resposnsavel por pegar dados 