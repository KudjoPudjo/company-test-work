import React from "react"
import classes from "./Checkbox.module.scss"

export type Props ={
    name:string,
    onChange:()=>void,
    checked:boolean,
    text:string
}
function Checkbox ({
    name,
    onChange,
    checked,
    text

                   }:Props){
    const clsText = [classes.checkboxText];
    const cls = [classes.checkboxWrap];
    const clsCheckBox = [classes.checkboxFake]
    const textCheckbox = text && (
        <span className={clsText.join(' ')}>{text}</span>
    );
    return (
        <label className={cls.join(' ')}>
            <input
                name={name}
                type="checkbox"
                className={classes.checkboxOriginal}
                onChange={onChange}
                checked={checked}
            />

            <span className={clsCheckBox.join(" ")} />
            {textCheckbox}
        </label>
    );
}

export default Checkbox