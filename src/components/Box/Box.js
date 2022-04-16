import style from "./box.module.css"

const Box = ({show, set, label, max}) => {

    const next = () => {
        if(show < max) set(parseInt(show) + 1)
    }

    const previous = () => {
        if(show > 1) set(parseInt(show) - 1)
    }

    return (
        <div className={style.container}>
            <span>{label}</span>
            <div className={style.box}>
                <button className = {style.plus} onClick={() => next()}> + </button>
                <button className = {style.minus} onClick={() => previous()}> - </button>
                <span>{show}</span>
            </div>
        </div>
        
    )
}

export default Box;