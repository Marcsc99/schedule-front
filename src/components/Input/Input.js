import style from "./input.module.css"

const Input = ({type, val, set, ph, min, max, width, height}) => {
    const customStyle = {
        width: `${width}px`,
        height: `${height}px`
    }
    return(
        <input 
            type ={type} 
            placeholder = {ph} 
            className = {style.input} 
            value = {val ?? ""} 
            onChange = {(e) => set(e.target.value)}
            min = {min}
            max = {max}
            style = {customStyle}
        ></input>
    )
}

export default Input