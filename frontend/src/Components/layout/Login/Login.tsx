import { useNavigate} from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button/Button";
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PasswordIcon from '@mui/icons-material/Password';
import { useForm } from "react-hook-form";
import "./Login.css";
import User from "../../../Models/User";
import { store } from "../../../app/store";
import { login } from "../../../app/user-state";
import { useState } from "react";

function Login(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<User>();
    const [isVisible, setIsVisible] = useState(false);

    const wrongDetails = () => {
        setIsVisible(true);
    };
    
    const send = async (loginuser: User)  => {
        try {
                await axios.post(`http://localhost:3001/user/login`, loginuser )
                 .then( res =>{
                    if (res.data!=="invalid username or password"){
                        if(res.data.id===1){
                            navigate("/admin/main")
                            store.dispatch(login(res.data));
                            localStorage.setItem("userid", res.data.id)
                        }else{
                            navigate("/user/main")
                            store.dispatch(login(res.data));
                            localStorage.setItem("userid", res.data.id)
                        }
                    }
                    else{wrongDetails();
                    return;}
                })
                    
        } catch (err: any) {
            console.log(err.message);
        }
    }
    return (
        <div className="Login">
            <div className="Box_Login">
                <form onSubmit={handleSubmit(send)}>
                        <Typography variant="h4" className="HeadLine">
                        Login
                        </Typography>
                        <AccountBoxIcon style={{ margin: 10, fontSize: 40 }} />
                        <TextField label="user Id" variant="outlined" {...register("user_nickname")}/>
                        <br />
                        <br />
                        <PasswordIcon style={{ fontSize: 40, margin: 10 }} />
                        <TextField label="password" variant="outlined" type="password" {...register("user_password")} />
                        <br />
                        {isVisible && (
                        <div className="error">
                            invalid username or password...
                        </div>
                        )}
                        <br />
                        <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="primary">Login</Button>
                        <Button onClick={() => {navigate("/register")}} color="secondary">Register </Button>
                        </ButtonGroup>
                </form>
            </div>
        </div>
    );
}

export default Login;
