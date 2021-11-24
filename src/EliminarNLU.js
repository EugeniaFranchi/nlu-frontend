import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./app/actions/EditorActions";
import FormName from "./FormName";
import Alert from "@mui/material/Alert";
import axios from "axios";
import url from "./index.js";
import "./styles.css";


const EliminarNLU = () => {

  const [state, setState] = useState('');
  const [foundNlu, setFoundNlu] = useState(false);
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

          setState('ErrorNotFound');
          setFoundNlu(false);
          console.log('Error: no existe una estructura con el nombre ' + name + '');
        
        } else {

          setState('Neutral');
          setFoundNlu(true);
          dispatch(actions.data(response.data));
          document.getElementById("outlined-basic-text").value = response.data.text;
        }
      })
      .catch(error => {
        let errorMessage = error.response.data.name;
        setState('ErrorFieldIsEmpty');
        setFoundNlu(false);
        dispatch(actions.name(''));
        console.log(errorMessage);
      }
    );

    } catch (e) {

      throw e;
    }
  }

  const deleteNLU = (event) => {
    
    event.preventDefault()
  
    axios
      .delete(url + "nlu_structure/" + id)
      .then(returnedNLU => {
        setState('Success');
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

      {(state === 'ErrorFieldIsEmpty') &&
        <div>
          <Alert variant="outlined" severity="error">
            Error: no se ha ingresado nombre.
          </Alert>
        </div>
      }
    </div>
  );
};

export default EliminarNLU;
