import Header from "../Header/HeaderAdmin";
import "./Statistics.css";
import React, { useEffect, useState } from 'react';
import Vacation from "../../../Models/Vacation";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { height } from "@mui/system";

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function Statistics(): JSX.Element {

    const [vacation, setVacation] = useState<Vacation[]>([]);


    // const token = localStorage.getItem('token');
    useEffect(() => {
        const url = "http://localhost:3001/vacation/all";
        axios.get(url)
       .then((response) => {
        setVacation(response.data);
       }).catch((error) => {console.log("error", error);});
   }, []);


    const graph = {
        labels: vacation.filter(v => v.follow!==null).map(v => v.destination),

        datasets: [{
          label: 'mumber of followers',
          data: vacation.filter(v => v.follow!==null).map(v => v.follow),
          backgroundColor: [
            'rgb(100, 20, 20)'
          ],
          borderColor: [
            'rgb(100, 20, 20)'
          ],
          borderWidth: 1,
        }]
      };

      const options: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };


    return (
        <div className="Statistics">
			<Header/>
            <div className="Chart">
            <Bar  data={graph} options={options} />
        </div>
        </div>
    );
}

export default Statistics;
