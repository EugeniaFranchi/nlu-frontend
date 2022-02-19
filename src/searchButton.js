import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as nluActions from "./app/actions/NluActions";
import * as stateActions from "./app/actions/StateActions";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const SearchButton = () => {
  const id = useSelector((store) => store.nlu.id);
  const name = useSelector((store) => store.nlu.name);
  const dispatch = useDispatch();

  const search = (event) => {
    
    event.preventDefault();

    try{
      
      axios
      .get(process.env.REACT_APP_URL + "nlu_structure_name?name="+ name)
      .then(response => {
        
        if(!response.data) {
          
          dispatch(stateActions.state('ErrorNotFound'));
          dispatch(nluActions.data({id: '', name: '', text: ''}));
          console.log('Error: no existe una estructura con el nombre ' + name + '');
        
        } else {

          dispatch(stateActions.state('Neutral'));
          const newData = {
            id: response.data._id,
            name: response.data.name,
            text: response.data.text
          }
          dispatch(nluActions.data(newData));
          document.getElementById("outlined-basic-text").value = response.data.text;
        }
      })
      .catch(error => {
        let errorMessage = error//.response.data.name;
        dispatch(stateActions.state('ErrorNotFound'));
        dispatch(nluActions.data({id: '', name: '', text: ''}));
        dispatch(nluActions.name(''));
        console.log(errorMessage);

        throw error;
      }
    );

    } catch (e) {

      

      throw e;
    }
  }

  return(
    <Box m={1} pt={2}>
        <Button variant="contained" onClick={search} type="submit" disabled={(id != '')} >
          Buscar
        </Button>
    </Box>
  );
}

export default SearchButton;
