import "./AddVacation.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import {FormControl, Input, Button, FormLabel, } from '@chakra-ui/react'
import axios from "axios";
import { useState } from "react";
import Vacation from "../../../Models/Vacation";
import Header from "../Header/HeaderAdmin";
import { TextField } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import type {} from '@mui/x-date-pickers-pro/themeAugmentation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";


function AddVication(): JSX.Element {

    const {register, handleSubmit} = useForm<Vacation>();
    const [file, setFile] = useState();
    const [start, setStart] = React.useState<Dayjs | null>(dayjs(null),);
    const [end, setEnd] = React.useState<Dayjs | null>(dayjs(null),);
    const navigat = useNavigate();
 

    
    // const token = localStorage.getItem('token');
    // console.log(token);
    const send = async (newVacation:Vacation) =>{
        newVacation.image = file;
        newVacation.start_date = start?.toDate().toLocaleDateString();
        newVacation.end_date= end?.toDate().toLocaleDateString();
        console.log(newVacation);
        const url = "http://localhost:3001/vacation/add";
        await axios.post(url, newVacation,{ 
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
            // headers: { authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data"
            // }
        
        .then((response)=>{console.log(response)
            setTimeout(()=>{navigat("/admin/main");
            },1000) ;
        
        })
        .catch(error =>{console.log(error);});
    }

    const handleFile = (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }

    const handleChangestart = (newValue: Dayjs | null) => {
        setStart(newValue);
      };
    const handleChangeEnd = (newValue: Dayjs | null) => {
        setEnd(newValue);
      };

    return (
        <div className="AddVication">
            <Header/>
            <div className="Box_add">
            <h2> Add Vacation: </h2>
            <form onSubmit={handleSubmit(send)} encType="multipart/form-data">
            <FormControl isRequired>

            <TextField label="description" variant="outlined" required sx={{ m: 0, width: '28.5ch' }} {...register("description")}/> <br /><br />

            <TextField label="destination" variant="outlined" required sx={{ m: 0, width: '28.5ch' }} {...register("destination")}/> <br /><br />

            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1, width: '30ch' }}>
            <DesktopDatePicker
            {...register("start_date")}
            label="Start date"
            inputFormat="MM/DD/YYYY"
            value={start}
            onChange={handleChangestart}
            renderInput={(params) => <TextField {...params} error={false} required/>}
            /><br /><br />
            <DesktopDatePicker
            {...register("end_date")}
            label="End date"
            inputFormat="MM/DD/YYYY"
            value={end}
            onChange={handleChangeEnd}
            renderInput={(params) => <TextField {...params} error={false} required/>}
            />
            </LocalizationProvider><br /><br />

            <TextField type={"number"} label="cost" variant="outlined" required sx={{ m: 0, width: '28.5ch' }} {...register("cost")}/> <br /><br />

            <FormLabel>image</FormLabel>
            <Input type="file" onChange={handleFile} color="primary" variant="outlined"  placeholder='image'  />
            </FormControl>
            <Button mt={4} onClick={()=>send} mb={4} color='primary' type='submit'> Submit</Button>
          </form>
          </div>
        </div>
        
    );
}

export default AddVication;
