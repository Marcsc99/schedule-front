import style from "./apointment.module.css"

const Apointment = ({apointment}) => {
    return (
        <div className={style.container}>
            <span>{apointment.title}</span>
            <span>{"Day: "+apointment.date.slice(0,10)}</span>
            <span>{"From: "+apointment.iniHour.hour + ":" + apointment.iniHour.minute}</span>
            <span>{"To: "+apointment.finishHour.hour + ":" + apointment.finishHour.minute}</span>
        </div>
    )
}

export default Apointment;