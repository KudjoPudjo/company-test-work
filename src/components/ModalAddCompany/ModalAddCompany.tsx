import React, {useState} from "react";
import Modal, {Props} from "../Modal/Modal";
import classes from "./ModalAddCompany.module.scss";
import {ICompany} from "../../interfaces/ICompany";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useDispatch} from "react-redux";
import {addCompany, editCompany} from "../../features/CompanySlice/CompanySlice";

export type modalAddCompanyType = {
    btnNextClick:()=>void,
    isEdit?:boolean,
    company?:ICompany,
} & Props

function ModalAddCompany ({open,btnNextClick,btnCancelClick,isEdit,company}:modalAddCompanyType){
    const [name,setName] = useState<string>(company?company.name:"");
    const [address,setAddress] = useState<string>(company?company.address:"");
    const dispatcher = useDispatch()
    const clearState = ()=>{
        setAddress('')
        setName('')
    }
    const handleNextClick = ()=>{
        if(isEdit){
            dispatcher(editCompany({name:name,address:address,id:company!.id!}))
        }else{
            dispatcher(addCompany({name:name,address:address}))
        }
        clearState()
        btnCancelClick()
    }
    return (
        <Modal open={open} btnCancelClick={btnCancelClick}>
            <h2 className={classes.modal_title}>{isEdit?"Редактирование компании":"Добавление новой компании"}</h2>
            <div className={classes.modal_form}>
                <Input title={"Название компании"} onChange={(event)=>{setName(event.target.value)}} value={name}></Input>
                <Input title={"Адрес"} onChange={(event)=>{setAddress(event.target.value)}} value={address}></Input>
            </div>
            <div className={classes.modal_buttons}>
                <Button text={isEdit?"Редактировать":"Сохранить"} onClick={handleNextClick}></Button>
                <Button text="Отмена" color="red" onClick={btnCancelClick}></Button>
            </div>
        </Modal>
    )
}

export default ModalAddCompany