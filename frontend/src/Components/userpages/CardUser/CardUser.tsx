import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { store } from "../../../app/store";
import { edit } from "../../../app/vacation-state";
import Vacation from "../../../Models/Vacation"; 
import "./CardUser.css";

function CardUser(props :{props1:Vacation, props2:number[]}): JSX.Element {


    const URL: string= "http://localhost:3001/";
    const start_date: any=props.props1.start_date;
    const end_date: any=props.props1.end_date;
    const [userid, setUserid] = useState<any>()
    const [likearry, setlikearry] = useState<number[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>();

    useEffect(() => {
        if(store.getState().userState.user?.id!==undefined){
            setUserid(store.getState().userState.user?.id);
        }
        else{
            setUserid(localStorage.getItem("userid"))
        }
        if(props.props2.length===0){
            console.log("hey");
            try{
                axios.get(URL+"like/userlikes/"+localStorage.getItem("userid"))
                .then(response => {
                    setlikearry(response.data);
                    console.log(response.data);
                    if(response.data.includes(props.props1.id)){
                        setIsLiked(true);
                    }
                    else{
                        setIsLiked(false);
                    }
                })
                
            } catch(err: any) {
                console.log(err.message);
            }
        }
        else{
            setlikearry(props.props2)
        if(props.props2.includes(props.props1.id)===true){
            setIsLiked(true);
        }
        else{
            setIsLiked(false);
        }
    }
    },[])

        const refreshlikes = () => {
        try{
            axios.get(URL+"like/userlikes/"+userid)
            .then(response => {
                setlikearry(response.data);
            })
        }
        catch(err: any) {
            console.log(err.message);
        }
    }
        const likes = (vacation_id:number) => async (e:React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        if(likearry.includes(vacation_id)){
            await axios.delete(URL+"like/"+userid+"/"+vacation_id)
            setIsLiked(false);
            refreshlikes();
        }
        else {
            await axios.post(URL+"like/add/"+userid+"/"+vacation_id);
            setIsLiked(true);
            refreshlikes();
        }
    }
    
    return (
        <div className="CardUser" key={props.props1.id} >
        	<div id="box" className="Box_main _card" >
                <div>
                    <img src={URL +"vacation/uploadPictures/"+props.props1.id+"/"+props.props1.image_name} alt="" /> <br />
                    <span className="destination">{props.props1.destination}</span> <br />
                    <span className="dates">{new Date(start_date).toLocaleDateString()}-
                    {new Date(end_date).toLocaleDateString()}</span><br /><hr />
                    <span className="description">{props.props1.description}</span><br />
                    <span className="cost">{props.props1.cost}$</span><br />
                </div>
                {isLiked &&(
                    <Button onClick={likes(props.props1.id)}>
                    <Favorite>
                    <EditIcon/>
                    </Favorite>
                    </Button>
                )}
                {!isLiked &&(
                     <Button onClick={likes(props.props1.id)}>
                     <FavoriteBorder>
                     <DeleteIcon />
                     </FavoriteBorder>
                     </Button>
                )}
            </div>
        </div>
    );
}

export default CardUser;

// import { FavoriteBorder, Favorite } from "@mui/icons-material";
// import { Button, Checkbox, IconButton } from "@mui/material";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { store } from "../../../app/store";
// import Vacation from "../../../Models/Vacation";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import "./CardUser.css";

// function CardUser(props:Vacation): JSX.Element {

//     const [likearry, setlikearry] = useState<number[]>([]);
//     const URL: string= "http://localhost:3001/";
//     const [userid, setUserid] = useState<any>();
//     const start_date: any=props.start_date;
//     const end_date: any=props.end_date;


//     useEffect(() => {
//         if(store.getState().userState.user?.id!==undefined){
//             setUserid(store.getState().userState.user?.id);
//         }
//         else{
//             setUserid(localStorage.getItem("userid"))
//         }
//         try{
//             axios.get(URL+"like/userlikes/"+userid)
//             .then(response => {
//                 setlikearry(response.data);
//             })
            
//         } catch(err: any) {
//             console.log(err.message);
//         }
//     },[])

//     const refreshlikes = () => {
//         try{
//             axios.get(URL+"like/userlikes/"+userid)
//             .then(response => {
//                 setlikearry(response.data);
//             })
//         }
//         catch(err: any) {
//             console.log(err.message);
//         }
//     }

//     const likes = (vacation_id:number) => async (e:React.MouseEvent<HTMLSpanElement>) => {
//         e.preventDefault();
//         if(likearry.includes(vacation_id)){
//             await axios.delete(URL+"like/"+userid+"/"+vacation_id)
//             refreshlikes();
//         }
//         else {
//             await axios.post(URL+"like/add/"+userid+"/"+vacation_id);
//             refreshlikes();
//         }
//     }
    
//     return (
//         <div className="CardUser">
// 			<div id="box" className="Box_main _card" >
//                 <div>
//                     <img src={URL +"vacation/uploadPictures/"+props.id+"/"+props.image_name} alt="" /> <br />
//                     <span className="destination">{props.destination}</span> <br />
//                     <span className="dates">{new Date(start_date).toLocaleDateString()}-
//                     {new Date(end_date).toLocaleDateString()}</span><br /><hr />
//                     <span className="description">{props.description}</span><br />
//                     <span className="cost">{props.cost}$</span><br />
//                 </div>
//                 <Button >
//                 <IconButton aria-label="edit" disabled color="primary">
//                 <EditIcon/>
//                 </IconButton>
//                 </Button>
//                 <Button >
//                 <IconButton aria-label="delete" disabled color="primary">
//                 <DeleteIcon />
//                 </IconButton>
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default CardUser;
