import React from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchButton from "./searchButton";
import { useSelector } from "react-redux";

const FormNameTextID = ({onSubmit, handleNluChangeName, handleNluChangeText, buttonName}) => {
  const id = useSelector((store) => store.nlu.id);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="formcontainer">
          <div className="container">
            <TextField margin="normal" id="outlined-basic-name" label="Nombre" variant="outlined" onChange={handleNluChangeName} placeholder="Ingresar nombre"/>
            <br/>
            <TextField margin="normal" id="outlined-basic-text" label="Texto" variant="outlined" onChange={handleNluChangeText} disabled={(id == '')} defaultValue=" "/>
          </div>
        </div>

        <SearchButton />
        <Box m={1} pt={2}>
            <Button variant="contained" type="submit" disabled={(id == '')} >
              {buttonName}
            </Button>
        </Box>
      </form>
    </div>
  );
};

export default FormNameTextID;
