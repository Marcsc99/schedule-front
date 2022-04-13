import styles from "./monthday.module.css"


const MonthDay = ({day, num = 30, dayStyle = null, holiday, apointment}) => {
    return (
        <div className = {styles.container} style = {dayStyle}>
            <h1>{day}</h1>
            <h2>{num}</h2>
            <h4>{holiday && holiday.name}</h4>
            {apointment.found && <div className={styles.greenBox} style = {{backgroundColor: apointment.color}}></div>}
        </div>
    )
}

export default MonthDay;