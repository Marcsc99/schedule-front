import style from "./input.module.css"

const Input = ({type, val, set, ph}) => {
    return(
        <input 
            type ={type} 
            placeholder = {ph} 
            className = {style.input} 
            value = {val} 
            onChange = {(e) => set(e.target.value)}
            disabled = {true}
        ></input>
    )
}

export default Input