import { setZeros } from "../../Calendar/functions"
import style from "./modalap.module.css"

const ModalAp = ({setModal, apointment}) => {

    return (
        <div className={style.modal} >
            <div className={style.grey} onClick={() => setModal()}></div>
            <div className = {style.apointment}>
                <h1>{apointment.title}</h1>
                <h2>{`Day: ${apointment.date.slice(0,10)}`}</h2>
                <h3>{`From: ${setZeros(apointment.iniHour.hour)}:${setZeros(apointment.iniHour.minute)}h`}</h3>
                <h3>{`To: ${setZeros(apointment.finishHour.hour)}:${setZeros(apointment.finishHour.minute)}h`}</h3>
                <p>{apointment.description}</p>
            </div>
        </div>
    )
}

export default ModalAp