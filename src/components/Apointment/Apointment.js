import { useState } from "react"
import { setZeros } from "../Calendar/functions"
import style from "./apointment.module.css"
import ModalAp from "./ModalAp/ModalAp"

const Apointment = ({apointment, week = false}) => {
    const [modal, setModal] = useState(false)

    const hour = apointment.iniHour.hour + (apointment.iniHour.minute/60); //Apointment initial hour with the minutes
    const sub = (apointment.finishHour.hour + (apointment.finishHour.minute/60)) - hour; //Time between initial hour and finish hour of the apointment
    const apDayStyle = { //Style of the apointment if the apointment is in the week grid
        width: "75%", 
        height: `calc(calc(80%/24) * ${sub})`, 
        position: "absolute",
        top:`calc(15% + (${hour} * calc(80%/24)))`,
        left:"12.5%",
        margin:0,
        fontSize: "0.75vw",
        border: "1px solid black"
    }
    const colorApStyle = {backgroundColor: apointment.color, color: apointment.textColor}; //If the apointment has a color, set it to the background
    const weekStyle = week ? apDayStyle : null; //If the apointment is in the week grid, set the apDayStyle to it
    return (
        <>
        {modal && <ModalAp setModal = {() => setModal(false) } apointment = {apointment}/>}
        <div className={style.container} style = {{...weekStyle,...colorApStyle}} onClick={() => setModal(true)}>
            <span>{apointment.title}</span>
            {week === false &&
            <div className = {style.info} style = {colorApStyle}>
                <span>{"Day: "+ apointment.date.slice(0,10)}</span>
                <span>{"From: "+ setZeros(apointment.iniHour.hour) + ":" + setZeros(apointment.iniHour.minute)}</span>
                <span>{"To: "+ setZeros(apointment.finishHour.hour) + ":" + setZeros(apointment.finishHour.minute)}</span>
            </div>
            }
        </div>
        </>
        
    )
}

export default Apointment;