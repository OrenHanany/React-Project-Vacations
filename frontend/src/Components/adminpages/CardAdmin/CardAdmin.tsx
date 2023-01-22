import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Checkbox, IconButton } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { store } from "../../../app/store";
import { edit, vacations } from "../../../app/vacation-state";
import Vacation from "../../../Models/Vacation";
import "./CardAdmin.css";

function CardAdmin(props :{props1:Vacation}): JSX.Element {

    const URL: string= "http://localhost:3001/";
    const navigate = useNavigate();
    const start_date: any=props.props1.start_date;
    const end_date: any=props.props1.end_date;
    const [isVisible, setIsVisible] = useState(true);
    const [deleted, setdeleted] =useState<number[]>([])

    useEffect(() => {
    },[])

    const editvacation = (vacation:Vacation) => async (e:React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        store.dispatch(edit(vacation));
        navigate('/edit')
        }

    const deleteVacation = (vacation:Vacation) => async (e:React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        setIsVisible(false);
        try{
        axios.delete(URL+"vacation/"+vacation.id)
        }
        catch(err: any) {
            console.log(err.message);
        }
        const url = "http://localhost:3001/vacation/all";
        axios.get(url)
       .then((response) => {console.log(response.data);
        store.dispatch(vacations(response.data));
       }).catch((error) => {console.log("error", error)});
    }
    
    return (
        <div className="CardAdmin" key={props.props1.id} >
            {isVisible &&(
        	<div id="box" className="Box_main _card" >
                <div>
                    <img src={URL +"vacation/uploadPictures/"+props.props1.id+"/"+props.props1.image_name} alt="" /> <br />
                    <span className="destination">{props.props1.destination}</span> <br />
                    <span className="dates">{new Date(start_date).toLocaleDateString()}-
                    {new Date(end_date).toLocaleDateString()}</span><br /><hr />
                    <span className="description">{props.props1.description}</span><br />
                    <span className="cost">{props.props1.cost}$</span><br />
                </div>
                <Button onClick={editvacation(props.props1)}>
                <IconButton aria-label="edit" disabled color="primary">
                <EditIcon/>
                </IconButton>
                </Button>
                <Button onClick={deleteVacation(props.props1)}>
                <IconButton aria-label="delete" disabled color="primary">
                <DeleteIcon />
                </IconButton>
                </Button>
            </div>
            )}
        </div>
    );
}

export default CardAdmin;
