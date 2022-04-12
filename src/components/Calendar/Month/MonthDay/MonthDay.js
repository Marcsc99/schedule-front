import styles from "./monthday.module.css"


const MonthDay = ({day, num = 30, dayStyle = null, holiday}) => {
    return (
        <div className = {styles.container} style = {dayStyle}>
            <h1>{day}</h1>
            <h2>{num}</h2>
            <h4>{holiday && holiday.name}</h4>
        </div>
    )
}

export default MonthDay;