import React, { useEffect, useState } from "react";
import styles from "./SelectPatient.module.css";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const SelectPatient = () => {
  // const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const patientsList = async () => {
      try {
        const res = await axiosInstance.get("/ward-reception/get-all-patients");

        setPatients(res.data.data);
        console.log("response", res.data);
      } catch (error) {
        toast.error(error.message || "internal Server error");
      }
    };

    patientsList();
  }, []);

  const handleAssignClick = (patient) => {

    

    navigate("/WardReceptionist/patientForm",{state : {patient}})
  }

  console.log("patients", patients);


  return (
    <div>
      <main>
        <section>
          <div className={styles.mainContainer}>
            <table>
              <thead>
                <tr>
                  <th>S/No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Ward</th>
                  <th>Assign Doctor</th>
                </tr>
              </thead>

              <tbody>
                {
                    patients.map((patient, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.age}</td>
                  <td>{patient.ward}</td>
                  <td><button className={styles.assignDocBtn} onClick={() => {handleAssignClick(patient) }}>Assign Doctor</button></td>
                </tr>
                    ))
                }
              </tbody>
            </table>

            
          </div>
        </section>
      </main>
    </div>
  );
};

export default SelectPatient;
