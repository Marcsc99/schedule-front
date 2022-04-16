import style from "./month.module.css"
import MonthDay from "./MonthDay/MonthDay";
import { useCallback, useEffect, useState } from "react";
import days from "../days/days"


const Month = ({date, holidays, apointments, monthDays}) => {
    const [grid, setGrid] = useState([]);
    const [monthName, setMonthName] = useState("");

    const getGrid = useCallback((tmpHoli, tmpAp) => {
        const count = monthDays;
        const markedDayStyle ={color: "red"}
        const otherMonthStyle ={backgroundColor: "grey"}
        const tmpGrid = count.map((c,i) => {
            const dayStyle = c.month ? (c.num === date.day ? markedDayStyle : null) : otherMonthStyle;
            const foundHoli = tmpHoli.find(mAp => new Date(mAp.date).getDate() === c.num)
            const foundAp = tmpAp.find(mAp => new Date(mAp.date).getDate() === count[i].num)
            const apointment = {found: foundAp != null, color: foundAp ? foundAp.color : null};
            return <MonthDay key = {i} day = {days[i%7]} num = {c.num} dayStyle = {dayStyle} holiday = {foundHoli} apointment = {apointment}/>
        })
        setGrid(tmpGrid);
    }, [date, monthDays])
    const iniMonth = useCallback(() => {
        const tmpMonth = new Date(date.year, date.month, date.day).toLocaleString('en-us', { month: 'long' }); 
        setMonthName(tmpMonth.toUpperCase());
    }, [date]);

    useEffect(() => {
        getGrid(holidays, apointments);
        iniMonth();
    }, [date, holidays, apointments, monthDays, getGrid, iniMonth])


    return (
        <div className={style.month}>
            <h3>{monthName}</h3>
            <div className = {style.container}>
                {grid}
            </div>
        </div>
        
    )
}

export default Month;