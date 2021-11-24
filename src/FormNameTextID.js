import React from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const FormNameTextID = ({onSubmit, onSearch, handleNluChangeName, handleNluChangeText, buttonName, foundNlu}) => {

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="formcontainer">
          <div className="container">
            <TextField margin="normal" id="outlined-basic-name" label="Nombre" variant="outlined" onChange={handleNluChangeName} placeholder="Ingresar nombre"/>
            <br/>
            <TextField margin="normal" id="outlined-basic-text" label="Texto" variant="outlined" onChange={handleNluChangeText} disabled={!foundNlu} defaultValue=" "/>
          </div>
        </div>

        <Box m={1} pt={2}>
            <Button variant="contained" onClick={onSearch} disabled={foundNlu} >
              Buscar
            </Button>
        </Box>
        <Box m={1} pt={2}>
            <Button variant="contained" type="submit" disabled={!foundNlu} >
              {buttonName}
            </Button>
        </Box>
      </form>
    </div>
  );
};

export default FormNameTextID;
