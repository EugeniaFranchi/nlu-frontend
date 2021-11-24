/*
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "./app/actions/EditorActions";
import FormNameTextID from "./FormNameLeer";
import Alert from "@mui/material/Alert";
import axios from "axios";
import "./styles.css";

const LeerNombre = () => {
  const [updateNlu, setUpdateNlu] = useState({id:''});
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const [state, setState] = useState('');

  const updateNLU = (event) => {
    
    event.preventDefault()
  
    var config = {
      method: 'get',
      url: 'http://localhost:8080/nlu_structure_name?name='+name,
      headers: { }
    };
   axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      dispatch(actions.datos(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleNluChangeName = (event) => {
          setName(event.target.value);
    }

 return (
    <div>
      <h1>Editar NLU</h1>

      <FormNameTextID onSubmit={updateNLU} 
                        handleNluChangeName={handleNluChangeName} 
                        buttonName="Buscar" />
      
      {(state === 'Success') && 
        <div>
          <Alert variant="outlined" severity="success">
            NLU modificado exitosamente.
          </Alert>
        </div>
      }

      {(state === 'Error') &&
        <div>
          <Alert variant="outlined" severity="error">
            Error: Nlu inexistente.
          </Alert>
        </div>
      }

    </div>
  );
};

export default LeerNombre;
*/
