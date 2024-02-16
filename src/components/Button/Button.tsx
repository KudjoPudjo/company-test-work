import React from "react"
import classes from "./Button.module.scss";

export type Props = {
    text?:string,
    onClick?:()=>void,
    color?:"red"|"blue"|"redsmall" | "bluesmall"
}
function Button ({text,onClick,color="blue"}:Props){
    return (
        <button className={[classes.button,classes[color]].join(' ')} onClick={onClick}>{text}</button>
    )
}

export default Button