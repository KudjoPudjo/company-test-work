import React, {useMemo, useState} from "react";
import Modal, {Props} from "../Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import classes from "./ModalAddEmployee.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {IEmployee} from "../../interfaces/IEmployee";
import {RootState} from "../../store/store";
import {addEmployee, editEmployee} from "../../features/EmployeeSlice/EmployeeSlice";
import Dropdown, {Option} from "react-dropdown"
import {ICompany} from "../../interfaces/ICompany";
import "./select.scss"
import {increaseCounter} from "../../features/CompanySlice/CompanySlice";
export type modalAddEmployeeType = {
    btnNextClick:()=>void,
    isEdit?:boolean,
    employee?:IEmployee,
} & Props

function ModalAddEmployee ({open,btnNextClick,isEdit,btnCancelClick,employee}:modalAddEmployeeType){
    const companies = useSelector((state:RootState)=>state.companies)
    const [name,setName] = useState<string>(employee?employee.name:"");
    const [pastName,setPastName] = useState<string>(employee?employee.pastName:"");
    const [jobTitle,setJobTitle] = useState<string>(employee?employee.jobTitle:"");
    const [selectedCompany,setSelectedCompany] = useState<Option>()

    const dispatcher = useDispatch()

    const clearState = ()=>{
        setSelectedCompany(undefined)
        setName('')
        setPastName('')
        setJobTitle('')
    }

    const handleNextClick = ()=>{
        if(isEdit){
            dispatcher(editEmployee({
                name:name,
                pastName:pastName,
                jobTitle:jobTitle,
                id:employee!.id
            }))
        }else{
            if(selectedCompany && selectedCompany.value){
                dispatcher(addEmployee({
                    name:name,
                    pastName:pastName,
                    jobTitle:jobTitle,
                    idCompany:+selectedCompany?.value
                }))
                dispatcher(increaseCounter({id:+selectedCompany.value}))
            }
        }
        clearState()
        btnCancelClick()
    }

    let options:Option[] = useMemo(():Option[]=>{
        return companies.map((elem:ICompany)=>({label:elem.name,value:elem.id.toString()}))
    },[companies])

    return (
        <Modal open={open} btnCancelClick={btnCancelClick}>
            <h2 className={classes.modal_title}>{isEdit?"Редактирование сотрудника":"Добавление нового сотрудника"}</h2>
            <div className={classes.modal_form}>
                <Input title={"Имя"} onChange={(event)=>{setName(event.target.value)}} value={name}></Input>
                {!isEdit?
                    <div className={"select"}>
                        <label className={"select_title"}>Компания</label>
                        <Dropdown
                            options={options}
                            value={selectedCompany}
                            className={"select_wrap"}
                            controlClassName="select_control"
                            onChange={setSelectedCompany}
                        />
                    </div>
                    :""}
            </div>
            <div className={classes.modal_form}>
                <Input title={"Фамилия"} onChange={(event)=>{setPastName(event.target.value)}} value={pastName}></Input>
                <Input title={"Должность"} onChange={(event)=>{setJobTitle(event.target.value)}} value={jobTitle}></Input>
            </div>
            <div className={classes.modal_buttons}>
                <Button text={isEdit?"Редактировать":"Сохранить"} onClick={handleNextClick}></Button>
                <Button text="Отмена" color="red" onClick={btnCancelClick}></Button>
            </div>
        </Modal>
    )
}

export default ModalAddEmployee