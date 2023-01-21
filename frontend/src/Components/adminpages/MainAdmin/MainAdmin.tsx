import { Box, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Vacation from "../../../Models/Vacation";
import CardUser from "../../userpages/CardUser/CardUser";
import CardAdmin from "../CardAdmin/CardAdmin";
import Header from "../Header/HeaderAdmin";
import "./MainAdmin.css";

const PER_PAGE=4;

function MainAdmin(): JSX.Element {
    const [vacation, setVacation] = useState<Vacation[]>([]);
    const [currentPage, setCurrentPage] = useState(0); 
    const [deleted1, setdeleted] =useState<number[]>([])

    

    useEffect(() => {
        let deleted=JSON.stringify(deleted1);
        localStorage.setItem("deleted", deleted);
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

   const currentPageData = vacation
   .slice(offset, offset + PER_PAGE)
   .map(item=> <CardAdmin key={item.id} props1={item}/>)
   const pageCount = Math.ceil(vacation.length / PER_PAGE);
    return (
        <div className="MainAdmin">
			<Header/>
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

export default MainAdmin;
