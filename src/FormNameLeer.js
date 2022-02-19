import React from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const FormNameTextID = ({onSubmit, handleNluChangeName, buttonName}) => {

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="formcontainer">
          <div className="container">
            <TextField margin="normal" id="outlined-basic" label="Nombre" variant="outlined" onChange={handleNluChangeName}/>
            <br/>
            <TextField margin="normal" id="outlined-basic" label="Texto" variant="outlined" disabled={true} />
          </div>
        </div>
  
        <Box m={1} pt={2}>
            <Button variant="contained" type="submit">
            {buttonName}
            </Button>
        </Box>
      </form>
    </div>
  );
};

export default FormNameTextID;
