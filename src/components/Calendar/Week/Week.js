import { useEffect, useState, useCallback } from "react";
import style from "./week.module.css"
import WeekDay from "./WeekDay/WeekDay";
import days from "../days/days"


const Week = ({date, holidays, apointments, weekDays, actualWeek}) => {
    const [grid, setGrid] = useState([]);

    const getGrid = useCallback((tmpHoli, tmpAp) => {
        const count = weekDays;
        const markedDayStyle ={color: "red"}
        const otherMonthStyle ={backgroundColor: "grey"}

        const tmpGrid = count.map((c, i) => {
            const dayStyle = c.month ? (count[i].num === date.day ? markedDayStyle : null) : otherMonthStyle;
            const foundHoli = tmpHoli.find(mAp => (new Date(mAp.date).getDate() === c.num) && c.month)
            const foundAp = tmpAp.filter(mAp => (new Date(mAp.date).getDate() === c.num) && c.month)
            return <WeekDay key = {i} day = {days[i%7]} num = {c.num} dayStyle = {dayStyle} holiday = {foundHoli} apointments = {foundAp} />
        });
        
        setGrid(tmpGrid);
    },[date, weekDays])

    useEffect(()=> {
        getGrid(holidays, apointments);
    }, [date, holidays, apointments, weekDays, getGrid])

    return (
        <div className={style.week}>
            <h3 className = {style.weekh3}>Week {actualWeek}</h3>
            <div className = {style.container}>
                {grid}
            </div>
        </div>
        
    )
}

export default Week;