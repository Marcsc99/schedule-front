import style from "./hour.module.css"

const Hour = ({hour}) => {
    return (
        <div className = {style.container}>
            <span>{hour}</span>
            <div className = {style.container2}> </div>
        </div>
    )
}

export default Hour;