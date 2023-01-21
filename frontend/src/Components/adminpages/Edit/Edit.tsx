import {FormControl, Input, Button, FormLabel, } from '@chakra-ui/react'
import { TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { start } from 'repl';
import { store } from "../../../app/store";
import Vacation from "../../../Models/Vacation";
import Header from "../Header/HeaderAdmin";
import "./Edit.css";

function Edit(): JSX.Element {
    
    const [vacation, setVacation] = useState<Vacation>();
    const navigate = useNavigate();
    const [start, setStart] = React.useState<Dayjs | null>(dayjs(vacation?.start_date),);
    const [end, setEnd] = React.useState<Dayjs | null>(dayjs(vacation?.end_date),);
    const [file, setFile] = useState();

    useEffect (() => {
        console.log(store.getState().vacationState.vacation);
        if(store.getState().vacationState.vacation?.id!==undefined){
            setVacation(store.getState().vacationState.vacation);
            let start= store.getState().vacationState.vacation?.start_date;
            console.log(start);
            setStart(dayjs(start));
            let end= store.getState().vacationState.vacation?.end_date;
            console.log(end);
            setEnd(dayjs(end));
        }
        else{
            navigate('/admin/main')
        }
    }, [])
 
    const {register, handleSubmit} = useForm<Vacation>({
        
    });
    
    // const token = localStorage.getItem('token');
    // console.log(token);
    const send = async (newVacation:Vacation) =>{
        console.log(newVacation)
        if (file!==undefined){
        newVacation.image = file;
        }
        let rightstart=start?.toDate().toLocaleDateString().split(".")[2]
        rightstart =rightstart + "-" + start?.toDate().toLocaleDateString().split(".")[1];
        rightstart =rightstart + "-" + start?.toDate().toLocaleDateString().split(".")[0];
        newVacation.start_date = rightstart
        let rightend=end?.toDate().toLocaleDateString().split(".")[2]
        rightend =rightend + "-" + end?.toDate().toLocaleDateString().split(".")[1];
        rightend =rightend + "-" + end?.toDate().toLocaleDateString().split(".")[0];
        newVacation.end_date = rightend;

        const url = `http://localhost:3001/vacation/update/${vacation?.id}`;
        await axios.put(url, newVacation,{ 
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
            // headers: { authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data"
            // }
        
        .then((response)=>{console.log(response)
            setTimeout(()=>{navigate("/admin/main");
            },1000) ;
        
        })
        .catch(error =>{console.log(error);});
    }

    const handleFile = (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0])
    }
    const handleChangestart = (newValue: Dayjs | null) => {
        setStart(dayjs(newValue));
      };
    const handleChangeEnd = (newValue: Dayjs | null) => {
        setEnd(dayjs(newValue));
      };
    return (
        <div className="Edit">
			<Header/>
            <div className="Box_add">
                <h2> Edit Vacation: </h2>
            <form onSubmit={handleSubmit(send)} encType="multipart/form-data">
            <FormControl >

            <TextField label="description" variant="outlined" defaultValue={store.getState().vacationState.vacation?.description} sx={{ m: 0, width: '28.5ch' }} {...register("description")}/> <br /><br />

            <TextField label="destination" variant="outlined" defaultValue={store.getState().vacationState.vacation?.destination} sx={{ m: 0, width: '28.5ch' }} {...register("destination")}/> <br /><br />

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
            renderInput={(params) => <TextField {...params} error={false} InputLabelProps={{ shrink: true }} onChange={(e) => handleChangeEnd(dayjs(e.target.value))} required/>}
            />
            </LocalizationProvider><br /><br />

            <TextField label="cost" variant="outlined" defaultValue={store.getState().vacationState.vacation?.cost} sx={{ m: 0, width: '28.5ch' }} {...register("cost")}/> <br /><br />

            <FormLabel>image</FormLabel>
            <Input type="file" onChange={handleFile} color="primary" variant="outlined"  placeholder='image'  />
            </FormControl>
            <Button mt={4} onClick={()=>send} mb={4} color='primary' type='submit'> Submit</Button>
          </form>
          </div>
        </div>
    );
}

export default Edit;
