import { useState } from "react"
import style from "./apointment.module.css"
import ModalAp from "./ModalAp/ModalAp"

const Apointment = ({apointment, week = false}) => {
    const [modal, setModal] = useState(false)

    const hour = apointment.iniHour.hour + (apointment.iniHour.minute/60)
    const sub = (apointment.finishHour.hour + (apointment.finishHour.minute/60)) - hour
    const apDayStyle = {
        width: "75%", 
        height: `calc(calc(80%/24) * ${sub})`, 
        position: "absolute",
        top:`calc(15% + (${hour} * calc(80%/24)))`,
        left:"12.5%",
        margin:0,
        fontSize: "0.75vw",
        border: "1px solid black"
    }
    const colorApStyle = apointment.color !== null ? {backgroundColor: apointment.color} : null;
    console.log(colorApStyle)
    const weekStyle = week === true ? apDayStyle : null;
    return (
        <>
        {modal && <ModalAp setModal = {() => setModal(false) } apointment = {apointment}/>}
        <div className={style.container} style = {{...weekStyle,...colorApStyle}} onClick={() => setModal(true)}>
            <span>{apointment.title}</span>
            {week === false &&
            <div className = {style.info} style = {colorApStyle}>
                <span>{"Day: "+ apointment.date.slice(0,10)}</span>
                <span>{"From: "+ (apointment.iniHour.hour.toString().length > 1 ? "" : "0") + apointment.iniHour.hour + ":" + (apointment.iniHour.minute.toString().length > 1 ? "" : "0") + apointment.iniHour.minute}</span>
                <span>{"To: "+ (apointment.finishHour.hour.toString().length > 1 ? "" : "0") + apointment.finishHour.hour + ":" + (apointment.finishHour.minute.toString().length > 1 ? "" : "0") + apointment.finishHour.minute}</span>
            </div>
            }
        </div>
        </>
        
    )
}

export default Apointment;