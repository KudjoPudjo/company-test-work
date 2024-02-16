import React from "react"
import classes from "./Modal.module.scss";



export type Props = {
    open:boolean,
    btnCancelClick:()=>void,
    children?:React.ReactNode
}
function Modal ({open,btnCancelClick,children}:Props){
    return (
        open?<div className={classes.wrap}>
            <div onClick={()=>btnCancelClick()} className={classes.black}></div>
            <div className={classes.modal}>
                <div className={classes.cross} onClick={()=>btnCancelClick()}></div>
                {children}
            </div>
        </div>:<></>

    )
}

export default Modal