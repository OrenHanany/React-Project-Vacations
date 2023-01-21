import "./Myvacations.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Vacation from "../../../Models/Vacation";
import ReactPaginate from "react-paginate";
import CardUser from "../CardUser/CardUser";
import { Box, SimpleGrid } from "@chakra-ui/react";
import Header from "../Header/HeaderUser";
import { store } from "../../../app/store";

const PER_PAGE = 4;

function Myvacations(): JSX.Element {

    const [vacation, setVacation] = useState<Vacation[]>([]);
    const [likearry, setlikearry] = useState<number[]>([])
    const [currentPage, setCurrentPage] = useState(0); 
    const URL: string= "http://localhost:3001/";
    

    useEffect(() => {
        let userid;
        if(store.getState().userState.user?.id!==undefined){
            userid=store.getState().userState.user?.id;
        }
        else{
            userid=localStorage.getItem("userid");
        }
        try{
            axios.get(URL+"like/userlikes/"+userid)
            .then(response => {
                console.log(response.data)
                setlikearry(response.data);
            })
        } catch(err: any) {
            console.log(err.message);
        }
        const url = "http://localhost:3001/vacation/all";
        axios.get(url)
       .then((response) => {console.log(response.data);
  
        setVacation(response.data);
  
       }).catch((error) => {console.log("error", error);});
   }, []);

   const handlePageClick = ({selected: selectedPage}:any) =>{
    setCurrentPage(selectedPage);
   }

   const offset = currentPage * PER_PAGE;
   const mydata:Vacation[]=[]
   const data = vacation.map(vacation => likearry.map(liked => {if(vacation.id===liked){mydata.push(vacation)}}))
   console.log(mydata)
   const currentPageData = mydata
   .slice(offset, offset + PER_PAGE)
   .map(item=> <CardUser key={item.id} props1={item} props2={likearry}/>)
   console.log(currentPageData)

   const pageCount = Math.ceil(mydata.length / PER_PAGE);

    return (
        <div className="Myvacations">
			<Header/>
            <div className="main">
                {currentPageData}
            </div>
            <ReactPaginate 
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"pagination__link--active"}
                />
        </div>
    );
}

export default Myvacations;
