import React, { useState } from "react";
import FormNameTextID from "./FormNameTextID";
import Alert from "@mui/material/Alert";
import axios from "axios";
import url from "./index.js";
import "./styles.css";

let errorMessage = '';

const EditarNLU = () => {
  
  const [updateNlu, setUpdateNlu] = useState({});
  const [state, setState] = useState('');

  const updateNLU = (event) => {
    
    event.preventDefault();

    axios
      .put(url + "nlu_structure", null, { params: updateNlu})
      .then(returnedNLU => {
        console.log(updateNlu);
        setUpdateNlu({});
        setState('Success');
        event.target.reset();
      })
      .catch(error => {
        console.log(updateNlu);
        setUpdateNlu({});
        errorMessage = error.response.data.name;
        console.log(errorMessage);
        setState('Error');
        event.target.reset();
      })
  }

  const handleNluChangeName = (event) => {
    let updateNluObject = {
      ...updateNlu,
      name: event.target.value
    }
    setUpdateNlu(updateNluObject);
  }
  
  const handleNluChangeText = (event) => {
    let updateNluObject = {
      ...updateNlu,
      text: event.target.value
    }
    setUpdateNlu(updateNluObject);
  }

  const handleNluChangeID = (event) => {
    let updateNluObject = {
      ...updateNlu,
      id: event.target.value
    }
    setUpdateNlu(updateNluObject);
  }

  return (
    <div>
      <h1>Editar NLU</h1>

      <FormNameTextID onSubmit={updateNLU} 
                        handleNluChangeID={handleNluChangeID}
                        handleNluChangeName={handleNluChangeName} 
                        handleNluChangeText={handleNluChangeText} 
                        buttonName="Editar" />
      
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
            {errorMessage}
          </Alert>
        </div>
      }

    </div>
  );
};

export default EditarNLU;
