import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from "@reduxjs/toolkit";
import {IEmployee} from "../../interfaces/IEmployee";

const initialState:IEmployee[] = [
    {
        id:Math.random(),
        idCompany:1,
        name:"Кирил",
        pastName:"Давыденко",
        jobTitle:"Менеджер"
    },
]

/** Создаем слайс Компаний */
const EmployeeSlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        addEmployee:(state,action:PayloadAction<{ name:string,pastName:string, jobTitle:string,idCompany:number}>)=>{
            let obj:IEmployee = {...action.payload, id:Math.random()}
            state.push(obj)
        },
        editEmployee:(state,action:PayloadAction<{ name:string,pastName:string, jobTitle:string,id:number }>)=>{
            let index = state.findIndex(elem=>elem.id===action.payload.id)
            let obj:IEmployee = {...state[index],...action.payload}
            state.splice(index,1,obj)
            console.log(state)
        },
        deleteEmployee:(state,action:PayloadAction<number[]>)=>{
            state = state.filter(elem=>!action.payload.includes(elem.id))
            return state
        },
    },
})
export const { addEmployee,editEmployee,deleteEmployee } = EmployeeSlice.actions
export default EmployeeSlice.reducer