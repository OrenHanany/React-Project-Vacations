
import { Routes, Route } from "react-router-dom";
import Login from "../layout/Login/Login"
import User from "../../Models/User";
import "./Routing.css";
import MainUser from "../userpages/MainUser/MainUser";
import MainAdmin from "../adminpages/MainAdmin/MainAdmin";
import Register from "../layout/Register/Register";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import AddVacation from "../adminpages/AddVacation/AddVacation";
import Edit from "../adminpages/Edit/Edit";
import Statistics from "../adminpages/Statistics/Statistics";
import Myvacations from "../userpages/Myvacations/Myvacations";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <React.StrictMode>
            <Provider store={store}>
			<Routes>
                <Route path="*" element={<Login/>}/>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/user/main" element={<MainUser/>}/>
                <Route path="/admin/main" element={<MainAdmin/>}/>
                <Route path="/AddVacation" element={<AddVacation/>}/>
                <Route path="/edit" element={<Edit/>}/>
                <Route path="/statistics" element={<Statistics/>}/>
                <Route path="/myvacations" element={<Myvacations/>}/>
            </Routes>
            </Provider>
            </React.StrictMode>
        </div>
    );
}

export default Routing;
