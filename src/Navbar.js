import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import VerNLUs from "./VerNLUs";
import AgregarNLU from "./AgregarNLU";
import EditarNLU from "./EditarNLU";
import EliminarNLU from "./EliminarNLU";
import LeerNombre from "./LeerPorNombre";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import logo from './img/logo.png';

import './styles.css'

const NavbarList = () => {
  const location = useLocation().pathname

  const list = () => {
    return(
      <div>
        <img src={logo} alt="Logo FIUBA" className="logo-img" />
        <Box m={0} pt={0}>
          <Button component={Link} to="/ver-nlus" variant="contained">Ver NLUs</Button>
        </Box>
        <br/>
        <Box m={0} pt={0}>
          <Button component={Link} to="/agregar-nlu" variant="contained">Agregar NLU</Button>
        </Box>
        <br/>
        <Box m={0} pt={0}>
          <Button component={Link} to="/editar-nlu" variant="contained">Editar NLU</Button>
        </Box>
        <br/>
        <Box m={0} pt={0}>
          <Button component={Link} to="/eliminar-nlu" variant="contained">Eliminar NLU</Button>
        </Box>
        <br/>
        <Box m={0} pt={0}>
          <Button component={Link} to="/leer-nlu" variant="contained">Leer NLU</Button>
        </Box>
      </div>
    )
  }

  return(
    location === "/" ? list() : null
  )
};

const NavbarButton = () => {
  const location = useLocation().pathname
  return(
    location === "/" ? null : <Button component={Link} to="/" variant="text">Volver</Button>
  )
};

export default function Navbar() {
  return (
    <Router>
      <div className="center">
        <NavbarList />
        
        <Switch>
          <Route path="/ver-nlus">
            <VerNLUs />
          </Route>
          <Route path="/agregar-nlu">
            <AgregarNLU />
          </Route>
          <Route path="/editar-nlu">
            <EditarNLU />
          </Route>
          <Route path="/eliminar-nlu">
            <EliminarNLU />
          </Route>
          <Route path="/"></Route>
        </Switch>

        <NavbarButton />
      </div>
    </Router>
  );
}
