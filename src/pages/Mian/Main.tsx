import React, {useMemo, useState} from "react"
import classes from "./Main.module.scss";
import Table from "../../components/Table/Table";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {IEmployee} from "../../interfaces/IEmployee";



function Main (){
    const companies = useSelector((state:RootState)=>state.companies);
    const employees = useSelector((state:RootState)=>state.employees);
    const [selected,setSelected] = useState<number[]>([])
    const [selectedEmployee,setSelectedEmployee] = useState<number[]>([])

    const employeesFiltered = useMemo(()=>{
        let arr:IEmployee[] = []
        employees.forEach((elem)=>{
            if(selected.includes(elem.idCompany)){
                arr = [...arr,elem]
            }
        })
        return arr
    },[selected,employees])

    return (
        <div className={classes.main}>
            <Table title={"Компании"}
                   headersTitles={["Чекбокс","Название компании", "Кол-во сотрудников", "Адрес"]}
                   items={companies}
                   isCompany={true}
                   selected={selected}
                   onSelect={setSelected}
            ></Table>
            <Table title={"Сотрудники"}
                   headersTitles={["Чекбокс","Фамилия", "Имя", "Должность"]}
                   items={employeesFiltered}
                   isCompany={false}
                   selected={selectedEmployee}
                   onSelect={setSelectedEmployee}
            ></Table>
        </div>
    )
}

export default Main