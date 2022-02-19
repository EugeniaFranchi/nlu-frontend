import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as nluActions from "./app/actions/NluActions";
import * as stateActions from "./app/actions/StateActions";
import FormNameTextID from "./FormNameTextID";
import Alert from "@mui/material/Alert";
import axios from "axios";
import "./styles.css";


const EditarNLU = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.state.state);
  const id = useSelector((store) => store.nlu.id);
  const name = useSelector((store) => store.nlu.name);
  const text = useSelector((store) => store.nlu.text);

  const updateNLU = (event) => {
    
    event.preventDefault();
  
    axios
      .put(process.env.REACT_APP_URL + "nlu_structure"+ "/" + id + "/" + "?name=" + name + "&text=" + text + "&id=")
      .then(returnedNLU => {

        dispatch(stateActions.state('Success'));
        console.log("Estructura editada sin problemas.");
        dispatch(nluActions.data({id: '', name: '', text: ''}));

        event.target.reset();
      })
      .catch(error => {
        const errorMessage = error.response.data.name;
        dispatch(stateActions.state('ErrorDuplicate'));
        console.log(errorMessage);
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
      <h1>Editar NLU</h1>

      <FormNameTextID onSubmit={updateNLU} 
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
