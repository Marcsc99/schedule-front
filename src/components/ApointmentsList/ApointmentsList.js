import { useEffect, useState } from "react";
import style from "./apointmentslist.module.css"
import { fetch } from "../../api/api";
import Apointment from "../Apointment/Apointment";

const ApointmentsList = ({change}) => {
    const [apointments, setApointments] = useState([])

    useEffect(() => {
        const getAppointments = async() => {
            const response = await fetch.getAppointments()
            setApointments(response.data.map((ap, i) => {
                return <Apointment key = {i} apointment = {ap}/>
            }))
        }
        getAppointments();
    },[change])
    return (
        <div className={style.container}>
            <h1>Apointments List</h1>
            {apointments}
        </div>
    )
}

export default ApointmentsList;