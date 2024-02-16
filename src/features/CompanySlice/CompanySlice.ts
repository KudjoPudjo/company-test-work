import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from "@reduxjs/toolkit";
import {ICompany} from "../../interfaces/ICompany";
import {IEmployee} from "../../interfaces/IEmployee";

const initialState:ICompany[] = [
    {
        name:"Роснефть ыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы",
        address:"Площадь минина и пожарскогоыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы",
        id:1,
        quantity:1,
    }
]

/** Создаем слайс Компаний */
export const CompanySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        addCompany:(state,action:PayloadAction<{ name:string,address:string }>)=>{
            let obj:ICompany = {...action.payload,quantity:0, id:Math.random()}
            state.push(obj)
        },
        editCompany:(state,action:PayloadAction<{ name:string,address:string,id:number }>)=>{
            let index = state.findIndex(elem=>elem.id===action.payload.id)
            let obj:ICompany = {...state[index],...action.payload}
            state.splice(index,1,obj)
        },
        deleteCompany:(state,action:PayloadAction<number[]>)=>{
            state = state.filter(elem=>!action.payload.includes(elem.id))
            return state
        },
        increaseCounter:(state,action:PayloadAction<{ id:number }>)=>{
            let index = state.findIndex(elem=>elem.id===action.payload.id)
            state[index].quantity += 1;
        },
        decreaseCounter:(state,action:PayloadAction<IEmployee[]>)=>{
            action.payload.forEach((elem)=>{
                let index = state.findIndex((e)=>e.id===elem.idCompany)
                state[index].quantity -= 1;
            })

        }

    },
})
export const { addCompany,editCompany,deleteCompany,decreaseCounter,increaseCounter } = CompanySlice.actions
export default CompanySlice.reducer