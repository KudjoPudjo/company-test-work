import React, {ChangeEvent} from "react"
import classes from "./Input.module.scss";

export type Props = {
    title?:string,
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void
    value:string
}
function Input ({title,value,onChange}:Props){
    return (
        <div className={classes.wrap}>
            {title?<label className={classes.title}>{title}</label>:""}
            <input onChange={((event)=>{onChange(event)})} value={value} className={classes.input}/>
        </div>
    )
}

export default Input