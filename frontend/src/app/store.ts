import { combineReducers } from "redux";
import { userReducer } from "./user-state";
import { configureStore } from "@reduxjs/toolkit";
import { vacationReducer } from "./vacation-state";

const reducers = combineReducers({ userState: userReducer, vacationState: vacationReducer });
export const store = configureStore({ reducer: reducers });

