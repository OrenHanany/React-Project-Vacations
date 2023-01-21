import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./HeaderUser.css";
import { useState } from "react";
import { store } from "../../../app/store";

function Header(): JSX.Element {

    const navigate = useNavigate();
    const theme = createTheme({
        palette: {
          secondary: {
            main: '#e1f5fe',
          },
        },
      });
    
    return (
        <div className="Header">
            <div className="hello"> </div>
			<ThemeProvider theme={theme}>
              <span className="logout">
                    <Button onClick={() => {navigate("/login")}} variant="outlined" color="secondary" size="medium"> 
                         Logout
                    </Button>
              </span>
              <span className="buttons">
                    <Button onClick={() => {navigate("/myvacations")}} variant="outlined" color="secondary" size="medium"> 
                         My Vacations
                    </Button> 
                    <Button onClick={() => {navigate("/user/main")}} variant="outlined" color="secondary" size="medium"> 
                          Main page
                    </Button> 
                    <Button onClick={() =>{navigate("/")}} variant="outlined" color="secondary" size="medium">
                          About
                    </Button>
              </span>
            </ThemeProvider>
                <div className="title"><span>VACATIONS</span></div>
        </div>
    );
}

export default Header;
