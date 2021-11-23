import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./app/actions/EditorActions";
import FormName from "./FormName";
import Alert from "@mui/material/Alert";
import axios from "axios";
import url from "./index.js";
import "./styles.css";

let errorMessage = '';

class ErrorNameDoesNotExist extends Error {
    
  constructor(name) {
      
      super();
      this.name = 'Error: no existe una estructura con el nombre ' + name + '';
      //Error.captureStackTrace(this, this.constructor);
  }
}

const EliminarNLU = () => {

  const [state, setState] = useState('');
  const [foundNlu, setFoundNlu] = useState(false);
  const [deleteNluId, setDeleteNluId] = useState("");
  const dispatch = useDispatch();
  const id = useSelector((store) => store.editor.id);
  const name = useSelector((store) => store.editor.name);

  // igual que en EditarNLU.js
  const searchNLU = (event) => {
    
    event.preventDefault();

    try{

      axios
      .get(url + "nlu_structure_name?name="+ name)
      .then(response => {
                
        if(!response.data) {

          throw new ErrorNameDoesNotExist(name);
        
        } else {

          //console.log(JSON.stringify(response.data));
          dispatch(actions.data(response.data));

          // Deshabilitar botón de busqueda
          setFoundNlu(true);
          // Habilitar input de texto
          // Que input de texto muestre text

          setDeleteNluId(response.data._id);


          document.getElementById("outlined-basic-text").value = response.data.text;

          setState('Neutral');
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

  const deleteNLU = (event) => {
    
    event.preventDefault()
  
    axios
      .delete(url + "nlu_structure/" + deleteNluId)
      .then(returnedNLU => {
        //console.log("Se eliminó con éxito el nlu: " + returnedNLU.data.name);
        setState('Success');
        setDeleteNluId("");
        event.target.reset();
        setFoundNlu(false);
      })
      .catch(error => {
        errorMessage = error;
        setState('Error');
        console.log(error);
        event.target.reset();
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
      <h1>Eliminar NLU</h1>
      <FormName onSubmit={deleteNLU} 
                onSearch={searchNLU}
                foundNlu={foundNlu}
                handleNluChangeName={handleNluChangeName}
                handleNluChangeText={handleNluChangeText} />
      
      {(state === 'Success') &&
        <div>
          <Alert variant="outlined" severity="success">
            NLU eliminado exitosamente.
          </Alert>
        </div>
      }

      {(state === 'ErrorNotFound') &&
        <div>
          <Alert variant="outlined" severity="error">
            Error: no se encontró una estructura con ese nombre.
          </Alert>
        </div>
      }
    </div>
  );
};

export default EliminarNLU;
