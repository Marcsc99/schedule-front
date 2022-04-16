import { useEffect, useState } from "react";
import style from "./apointmentslist.module.css"
import { fetch } from "../../api/api";
import Apointment from "../Apointment/Apointment";

const ApointmentsList = ({newApointment}) => {
    const [apointments, setApointments] = useState([])

    const getAppointments = async() => {
        const response = await fetch.getAppointments()
        setApointments(response.data.map((ap, i) => {
            return <Apointment key = {i} apointment = {ap}/>
        }))
    }

    useEffect(() => {
        getAppointments();
    },[newApointment])

    return (
        <div className={style.container}>
            <h1>Apointments List</h1>
            <div className = {style.apointmentsList}>
                {apointments}
            </div>
        </div>
    )
}

export default ApointmentsList;