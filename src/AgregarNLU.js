import React, { useState } from "react";
import FormNameText from "./FormNameText";
import Alert from "@mui/material/Alert";
import axios from "axios";
import "./styles.css";

let errorMessage = '';

const AgregarNLU = () => {
  
  const [newNlu, setNewNlu] = useState({});
  const [state, setState] = useState('');

  const addNLU = (event) => {
    
    event.preventDefault();

    axios
      .post(process.env.REACT_APP_URL + "nlu_structure", null, { params: newNlu})
      .then(returnedNLU => {
        setNewNlu({});
        setState('Success');
        event.target.reset();
      })
      .catch(error => {
        errorMessage = error.response.data.name;
        setState('Error');
        event.target.reset();
        console.log(errorMessage);
      })
  }

  const handleNluChangeName = (event) => {
    let newNluObject = {
      ...newNlu,
      name: event.target.value
    }
    setNewNlu(newNluObject);
  }
  
  const handleNluChangeText = (event) => {
    let newNluObject = {
      ...newNlu,
      text: event.target.value
    }
    setNewNlu(newNluObject);
  }

  return (

    <div>

      <h1>Agregar NLU</h1>

      <FormNameText onSubmit={addNLU} 
          handleNluChangeName={handleNluChangeName}
          handleNluChangeText={handleNluChangeText}
          buttonName="Agregar" />

      {(state === 'Success') &&
        <div>
          <Alert variant="outlined" severity="success">
            NLU agregado exitosamente.
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

export default AgregarNLU;
