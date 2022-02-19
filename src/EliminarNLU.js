import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as nluActions from "./app/actions/NluActions";
import * as stateActions from "./app/actions/StateActions";
import FormName from "./FormName";
import Alert from "@mui/material/Alert";
import axios from "axios";
import "./styles.css";

let errorMessage = '';

const EliminarNLU = () => {
  const dispatch = useDispatch();
  const id = useSelector((store) => store.nlu.id);
  const state = useSelector((store) => store.state.state);

  const deleteNLU = (event) => {
    
    event.preventDefault()
  
    axios
      .delete(process.env.REACT_APP_URL + "nlu_structure/" + id)
      .then(returnedNLU => {
        dispatch(stateActions.state('Success'));
        dispatch(nluActions.data({id: '', name: '', text: ''}));
        event.target.reset();
      })
      .catch(error => {
        errorMessage = error;
        dispatch(stateActions.state('ErrorNotFound'));
        console.log(error);
        event.target.reset();
      })
  }

  const handleNluChangeName = (event) => {
    dispatch(nluActions.name(event.target.value));
  }

  const handleNluChangeText = (event) => {
    dispatch(nluActions.text(event.target.value));
  }

  return (
    
    <div>
      <h1>Eliminar NLU</h1>
      <FormName onSubmit={deleteNLU} 
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
            Error: nombre inexistente.
          </Alert>
        </div>
      }
    </div>
  );
};

export default EliminarNLU;
