import React, { useEffect, useState } from 'react'
import styles from "./SelectPatient.module.css"
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';


const SelectPatient = () => {

    const [loading, setLoading] = useState(false);
    const [patients,setPatients] = useState([]);


    useEffect(() => {
        const patientsList = () => {
            try {
                const res = axiosInstance.get("/ward-reception/get-all-patients");
                
                console.log("res",res)
                setPatients(res.data.data)

            } catch (error) {
                toast.error(error.message || "internal Server error")
            }
        }

         patientsList()

    },[]);

  return (
    <div>
        <main>
            <section>
                <div className={styles.mainContainer}>
                    
                </div>
            </section>
        </main>
    </div>
  )
}

export default SelectPatient