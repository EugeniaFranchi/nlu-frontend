import React from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import SearchButton from "./searchButton";
import { useSelector } from "react-redux";

const FormName = ({onSubmit, handleNluChangeName, handleNluChangeText}) => {
  const id = useSelector((store) => store.nlu.id);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="formcontainer">
          <div className="container">
            <TextField margin="normal" id="outlined-basic-name" label="Nombre" variant="outlined" onChange={handleNluChangeName} />
            <br/>
            <TextField margin="normal" id="outlined-basic-text" label="Texto" variant="outlined" onChange={handleNluChangeText} disabled={true} defaultValue=" "/>
          </div>
        </div>

        <SearchButton />
        <Box m={1} pt={2}>
          <Button variant="outlined" startIcon={<DeleteIcon />} type="submit" disabled={(id == '')} >
            Eliminar NLU
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default FormName;
