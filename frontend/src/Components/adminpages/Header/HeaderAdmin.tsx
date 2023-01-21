import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./HeaderAdmin.css";


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
            <ThemeProvider theme={theme}>
              <span className="logout">
                    <Button onClick={() => {navigate("/login")}} variant="outlined" color="secondary" size="medium"> 
                         Logout
                    </Button>
              </span>
              <span className="buttons">
                    <Button onClick={() => {navigate("/AddVacation")}} variant="outlined" color="secondary" size="medium"> 
                         Add Vacation
                    </Button> 
                    <Button onClick={() => {navigate("/admin/main")}} variant="outlined" color="secondary" size="medium"> 
                          Main page
                    </Button> 
                    <Button onClick={() =>{navigate("/statistics")}} variant="outlined" color="secondary" size="medium">
                          Statistics
                    </Button>
              </span>
            </ThemeProvider>
                <div className="title"><span>VACATIONS</span>
              </div>
        </div>
    );
}

export default Header;
