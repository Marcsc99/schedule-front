import style from "./box.module.css"
import { useEffect } from "react";

const Box = ({show, set, label, max}) => {

    useEffect(()=> {

    })
    return (
        <div className={style.container}>
            <span>{label}</span>
            <div className={style.box}>
                <button className = {style.plus} onClick={() => {if(show < max) set(parseInt(show) + 1)}}>+</button>
                <button className = {style.minus} onClick={() => {if(show > 1) set(parseInt(show) - 1)}}>-</button>
                {show}
            </div>
        </div>
        
    )
}

export default Box;