import style from "./header.module.css"
import Box from "../Box/Box";

const Header = ({
    onChange, 
    values
}) => {
    
    const MAX_YEAR = 9999
    const MAX_MONTH = 12
    const MAX_DAY = new Date(values.year, values.month , 0).getDate()
    
    return (
        <div className = {style.header}>
            <h2>Einatec</h2>
                <div className = {style.date}>
                    <Box show = {values.year} set = {onChange.year} label = "Year" max ={MAX_YEAR}/>
                    <Box show = {values.month} set = {onChange.month} label = "Month" max = {MAX_MONTH}/>
                    <Box show = {values.day} set = {onChange.day} label = "Day" max={MAX_DAY}/>
                </div>
            <h2>User</h2>
        </div>
    )
}

export default Header;