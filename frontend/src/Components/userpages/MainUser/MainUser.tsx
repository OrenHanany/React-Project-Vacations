import { Box, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { store } from "../../../app/store";
import Vacation from "../../../Models/Vacation";
import CardUser from "../CardUser/CardUser";
import HeaderUser from "../Header/HeaderUser";
import "./MainUser.css";

const PER_PAGE=3;

function MainUser(): JSX.Element {
    const [vacation, setVacation] = useState<Vacation[]>([]);
    const [currentPage, setCurrentPage] = useState(0); 
    const [userid, setUserid] = useState<any>()
    const [likearry, setlikearry] = useState<number[]>([]);
    const URL: string= "http://localhost:3001/";
    

    useEffect(() => {
        const url = "http://localhost:3001/vacation/all";
        axios.get(url)
       .then((response) => {console.log(response.data);
  
        setVacation(response.data);
  
       }).catch((error) => {console.log("error", error);});

       if(store.getState().userState.user?.id!==undefined){
        setUserid(store.getState().userState.user?.id);
    }
    else{
        setUserid(localStorage.getItem("userid"))
    }
        axios.get(URL+"like/userlikes/"+localStorage.getItem("userid"))
        .then(response => {
            setlikearry(response.data);
        }).catch((error) => {console.log("error", error);})  
   }, []);

   const handlePageClick = ({selected: selectedPage}:any) =>{
    setCurrentPage(selectedPage);
   }

   const offset = currentPage * PER_PAGE;

   const currentPageData = vacation
   .slice(offset, offset + PER_PAGE)
   .map(item=><CardUser key={item.id} props1={item} props2={likearry}/>)
   const pageCount = Math.ceil(vacation.length / PER_PAGE);
    return (
        <div className="MainUser">
			<HeaderUser/>
            <div className="main" >
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

export default MainUser;
