import { useEffect } from "react"
import style from "./modalap.module.css"

const ModalAp = ({setModal, apointment}) => {

    useEffect(()=>{
        console.log("Modal Abierta")
    },[])

    return (
        <div className={style.modal} >
            <div className={style.grey} onClick={() => setModal()}></div>
            <div className = {style.apointment}>
                <h1>{apointment.title}</h1>
                <h2>{`Day: ${apointment.date.slice(0,10)}`}</h2>
                <h3>{`From: ${(apointment.iniHour.hour.toString().length > 1 ? "" : "0") + apointment.iniHour.hour}:${(apointment.iniHour.minute.toString().length > 1 ? "" : "0") + apointment.iniHour.minute}h`}</h3>
                <h3>{`To: ${(apointment.finishHour.hour.toString().length > 1 ? "" : "0") + apointment.finishHour.hour}:${(apointment.finishHour.minute.toString().length > 1 ? "" : "0") + apointment.finishHour.minute}h`}</h3>
                <p>{apointment.description}</p>
            </div>
        </div>
    )
}

export default ModalAp