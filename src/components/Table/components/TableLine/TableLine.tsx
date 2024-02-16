import React, {useState} from "react"
import classes from "./TableLine.module.scss"
import {ICompany} from "../../../../interfaces/ICompany";
import {IEmployee} from "../../../../interfaces/IEmployee";
import Checkbox from "../../../Checkbox/Checkbox";
import ModalAddCompany from "../../../ModalAddCompany/ModalAddCompany";
import ModalAddEmployee from "../../../ModalAddEmployee/ModalAddEmployee";

export type Props = {
    item:ICompany | IEmployee,
    onSelect: (id:number)=>void,
    isCompany:boolean,
    selected:number[],
    idCompany?:number
}

function TableLine ({item,onSelect,isCompany,selected,idCompany}:Props){
    const [openModal,setOpenModal] = useState<boolean>(false)


    return isCompany?
        (<div className={classes.item}>
            <Checkbox text="" name={item.id.toString()} onChange={()=>onSelect(item.id)} checked={Boolean(selected.find(elem=>elem===item.id))} />
            <div className={classes.item_text}>{item.name}</div>
            <div>{"quantity" in item ? item.quantity :""}</div>
            <div className={classes.item_text}>{"address" in item ? item.address :""}</div>
            <div className={classes.edit} onClick={()=>setOpenModal(true)}></div>
            <ModalAddCompany isEdit={true} company={item as ICompany} btnNextClick={()=>{}} open={openModal} btnCancelClick={()=>setOpenModal(false)}></ModalAddCompany>
        </div>)
        :(<div className={[classes.item,Boolean(selected.find(elem=>elem===item.id))?classes.selected:""].join(' ')}>
            <Checkbox text="" name={item.id.toString()} onChange={()=>onSelect(item.id)} checked={Boolean(selected.find(elem=>elem===item.id))} />
            <div className={classes.item_text}>{"pastName" in item ? item.pastName :""}</div>
            <div className={classes.item_text}>{item.name}</div>
            <div className={classes.item_text}>{"jobTitle" in item ? item.jobTitle :""}</div>
            <div className={classes.edit} onClick={()=>setOpenModal(true)}></div>
            <ModalAddEmployee isEdit={true} employee={item as IEmployee} btnNextClick={()=>{}} open={openModal} btnCancelClick={()=>setOpenModal(false)}></ModalAddEmployee>
        </div>)
}


export default TableLine