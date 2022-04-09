import style from "./header.module.css"
import Box from "../Box/Box";

const Header = ({year, setYear, month, setMonth, day, setDay}) => {
    return (
        <div className = {style.header}>
            <h2>Einatec</h2>
            
                <div className = {style.date}>
                    <Box show = {year} set = {setYear} label = "Year" max ={9999}/>
                    <Box show = {month} set = {setMonth} label = "Month" max = {12}/>
                    <Box show = {day} set = {setDay} label = "Day" max={new Date(year, month , 0).getDate()}/>
                </div>
            <h2>User</h2>
        </div>
    )
}

export default Header;