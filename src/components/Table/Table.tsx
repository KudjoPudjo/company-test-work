import React, {useState} from "react"
import classes from "./Table.module.scss"
import {ICompany} from "../../interfaces/ICompany";
import {IEmployee} from "../../interfaces/IEmployee";
import TableLine from "./components/TableLine/TableLine";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {decreaseCounter, deleteCompany} from "../../features/CompanySlice/CompanySlice";
import {deleteEmployee} from "../../features/EmployeeSlice/EmployeeSlice";
import ModalAddCompany from "../ModalAddCompany/ModalAddCompany";
import ModalAddEmployee from "../ModalAddEmployee/ModalAddEmployee";
import {RootState} from "../../store/store";

export type Props = {
    title:string,
    headersTitles:string[],
    items:ICompany[] | IEmployee[],
    isCompany:boolean,
    selected:number[],
    onSelect:(id:number[])=>void,
}

function Table ({
    title,
    headersTitles,
    items,
    isCompany,
    selected,
    onSelect,
}:Props){
    const [openModal,setOpenModal] = useState<boolean>(false)
    const employees = useSelector((state:RootState)=>state.employees)
    const dispatcher = useDispatch()
    const handleSelect = (id:number)=>{
        if(selected.includes(id)){
            let arr = selected.filter(elem=>elem!==id)
            onSelect(arr)
        }else{
            let arr = [...selected,id]
            onSelect(arr)
        }
    }
    return (
        <div className={classes.table}>
            <div className={classes.table_header}>
                <h2 className={classes.table_title}>{title}</h2>
                <div className={classes.table_header_wrap}>
                    <Button color={"bluesmall"} onClick={()=>{
                        setOpenModal(true)
                    }} text={isCompany?"Добавить компанию":"Добавить сотрудника"}></Button>
                    <Button color={"redsmall"} onClick={()=>{
                        if(isCompany){
                            dispatcher(deleteCompany(selected))
                            onSelect([])
                        }else {
                            dispatcher(deleteEmployee( selected))
                            let arrEmployees = employees.filter((elem)=>selected.includes(elem.id))
                            dispatcher(decreaseCounter(arrEmployees))
                            onSelect([])
                        }
                    }} text="Удалить выбраных"></Button>
                    <Checkbox
                        onChange={()=>{
                            if(selected.length===items.length){
                                onSelect([])
                            }else{
                                onSelect(items.map(elem=>elem.id))
                            }
                        }}
                        text="Выделить всё"
                        checked={selected.length===items.length && selected.length!== 0}
                        name="markAll"
                    />
                </div>

            </div>
            <div className={classes.table_titles}>
                {headersTitles.map(elem=>(
                    <div className={classes.table_titles_text} key={elem}>{elem}</div>
                ))}
            </div>
            <div className={classes.table_body}>
                {items.map(elem=>(
                    <TableLine selected={selected} key={elem.id} item={elem} onSelect={handleSelect} isCompany={isCompany}></TableLine>
                ))}
            </div>
            {isCompany?<ModalAddCompany btnNextClick={()=>{}} open={openModal} btnCancelClick={()=>setOpenModal(false)} />:<ModalAddEmployee btnNextClick={()=>{}} open={openModal} btnCancelClick={()=>setOpenModal(false)}/>}
        </div>
    )
}

export default Table