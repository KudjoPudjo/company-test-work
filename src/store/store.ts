import {configureStore} from "@reduxjs/toolkit";
import CompanySlice from '../features/CompanySlice/CompanySlice'
import EmployeeSlice from "../features/EmployeeSlice/EmployeeSlice";

/** Хранилище приложения */
export const store = configureStore({
    reducer:{
        companies:CompanySlice,
        employees:EmployeeSlice
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch