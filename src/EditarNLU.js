import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./app/actions/EditorActions";
import FormNameTextID from "./FormNameTextID";
import Alert from "@mui/material/Alert";
import axios from "axios";
import url from "./index.js";
import "./styles.css";

class ErrorNameDoesNotExist extends Error {
    
  constructor(name) {
      
      super();
      this.name = 'Error: no existe una estructura con el nombre ' + name + '';
      //Error.captureStackTrace(this, this.constructor);
  }
}

const EditarNLU = () => {
  
  const [state, setState] = useState('');
  const [foundNlu, setFoundNlu] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((store) => store.editor.id);
  const name = useSelector((store) => store.editor.name);
  const text = useSelector((store) => store.editor.text);

  // igual que en EliminarNLU.js
  const searchNLU = (event) => {
    
    event.preventDefault();

    try{

      axios
      .get(url + "nlu_structure_name?name="+ name)
      .then(response => {
                
        if(!response.data) {

          throw new ErrorNameDoesNotExist(name);
        
        } else {

          setState('Neutral');
          setFoundNlu(true);
          dispatch(actions.data(response.data));
          document.getElementById("outlined-basic-text").value = response.data.text;
        }
      })
      .catch(function (error) {

        setState('ErrorNotFound');
        setFoundNlu(false);
        console.log(error);
      }
    );

    } catch (e) {

      throw e;
    }
  }

  const updateNLU = (event) => {
    
    event.preventDefault();
  
    axios
      .put(url + "nlu_structure?name=" + name + "&text=" + text + "&id=" + id)
      .then(returnedNLU => {

        setState('Success');
        console.log("Estructura editada sin problemas.");
        setFoundNlu(false);

        event.target.reset();
      })
      .catch(error => {
        const errorMessage = error.response.data.name;
        setState('ErrorDuplicate');
        console.log(errorMessage);
      })
  }

  const handleNluChangeName = (event) => {
    dispatch(actions.name(event.target.value));
  }
  
  const handleNluChangeText = (event) => {
    dispatch(actions.text(event.target.value));
  }

  return (
    <div>
      <h1>Editar NLU</h1>

      <FormNameTextID onSubmit={updateNLU} 
                        onSearch={searchNLU}
                        handleNluChangeName={handleNluChangeName} 
                        handleNluChangeText={handleNluChangeText} 
                        buttonName="Editar"
                        foundNlu={foundNlu} />
      
      {(state === 'Success') && 
        <div>
          <Alert variant="outlined" severity="success">
            NLU modificado exitosamente.
          </Alert>
        </div>
      }

      {(state === 'ErrorNotFound') &&
        <div>
          <Alert variant="outlined" severity="error">
            Error: Nlu inexistente.
          </Alert>
        </div>
      }

      {(state === 'ErrorDuplicate') &&
        <div>
          <Alert variant="outlined" severity="error">
            Error: ya existe una estructura con el mismo nombre.
          </Alert>
        </div>
      }

    </div>
  );
};

export default EditarNLU;
