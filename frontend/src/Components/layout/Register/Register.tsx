import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, ButtonGroup, Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import User from "../../../Models/User";
import "./Register.css";

function Register(): JSX.Element {
    const [newid, setnewid]= React.useState("")
    const [isPasswordOk, setisPasswordOk] = React.useState(false);
    const [user, setUser] = useState<User[]>([]);
    const { register, handleSubmit } = useForm<User>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    const [isError, setisError] = useState(false);
    const [isCapital, setisCapital] = useState(false);
    const [isNumber, setisNumber] = useState(false);
    const [isLetter, setisLetter] = useState(false);
    const [isSpecial, setisSpecial] = useState(false);
    const [isExist, setisExist] = useState(false)


    const errorDetails = () => {setisError(true)};

    useEffect(() => {
        try{
            axios.get("http://localhost:3001/user/all")
            .then(response => {
                setUser(response.data);
            })
        } catch(err: any) {
            console.log(err.message);
        }
    },[])

    const handleInputIdChange= (e:any) => {
        setnewid(e.target.value)
    }
    const handleInputChange = (e: any) => {
        errorDetails();
        const pass= e.target.value;
        const capital = pass.match(/[A-Z]/)!= null ? true : false;
        capital?setisCapital(true):setisCapital(false);
        const num =pass.match(/[0-9]/) != null? true: false;
        num?setisNumber(true):setisNumber(false);
        const letter = pass.match(/[a-z]/)!= null ? true : false;
        letter?setisLetter(true):setisLetter(false);
        const special = pass.match(/[!@#$%^&*()<>.?":;]/)!= null ? true : false;
        special?setisSpecial(true):setisSpecial(false);
        if (capital && num && letter && special){
            setisPasswordOk(true);
        }
        else{
            setisPasswordOk(false);
        }
    }
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const send = async (newuser: User) => {
        let userexist:number=0;
        console.log(newuser)
        user.map((item)=>{
            if(item.user_nickname===newid){
                userexist+=1;
            }
        })
        if(userexist===0){ 
            console.log("user id is not exist :). specialID=");
            console.log(isPasswordOk)
            if (isPasswordOk){
                try {
                        await axios.post("http://localhost:3001/user/add",newuser)
                        .then(res=>navigate("/"));
                        console.log("user added")
                } catch (err: any) {
                    console.log(err.message);
                }
            }
        }   
        else{
            setisExist(true);
        }

    }
    return (
        <div className="Register">
            <div className="Box_register">
                <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">
                    Register
                    </Typography><br/><br/>
                    <TextField label="User name" variant="outlined" required sx={{ m: 1, width: '30ch' }} {...register("user_name")}/>
                    <br/>
                    <br/>
                    <TextField label="User last name" variant="outlined" required sx={{ m: 1, width: '30ch' }} {...register("user_lastname")}/>
                    <br/>
                    <br/>
                    <FormControl onChange={handleInputIdChange} >
                    <TextField label="User Id" variant="outlined" required sx={{ m: 1, width: '30ch' }} {...register("user_nickname")}/>
                    {isExist &&(
                                <div className="wrong">❌ This user name is already exist...</div>
                            )}
                    </FormControl>
                    <br />
                    <br />
                    <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined"  required onChange={handleInputChange}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            {...register("user_password")}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    {isError && (
                        <div className="error">
                             {!isLetter &&(
                                <div className="wrong">❌ Letter...</div>
                            )}
                            {isLetter &&(
                                <div className="right">✅ Letter</div>
                            )}
                            {!isNumber &&(
                                <div className="wrong">❌ Number...</div>
                            )}
                            {isNumber &&(
                                <div className="right">✅ Number</div>
                            )}
                            {!isCapital &&(
                                <div className="wrong">❌ Capital letter...</div>
                            )}
                            {isCapital &&(
                                <div className="right">✅ Capital letter</div>
                            )}
                            {!isSpecial &&(
                                <div className="wrong">❌ Special charecter...</div>
                            )}
                            {isSpecial &&(
                                <div className="right">✅ Special charecter</div>
                            )}
                        </div>
                    )}
                    <br />
                    <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">Submit</Button>
                    <Button size="medium" variant="text" onClick={() => {navigate("/login")}}> back to login </Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}

export default Register;
