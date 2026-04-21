import React, { useEffect, useState } from "react";
import styles from "./Doctors.module.css";
import StatusCard from "../../components/sameComponent/StatusCard";
import {
  Activity,
  Calendar,
  ListCheckIcon,
  ListCollapse,
  PencilLineIcon,
  UserCheckIcon,
} from "lucide-react";
import toast from "react-hot-toast";


import { FaList, FaListAlt } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const Doctors = () => {

  const [allPatients, setAllPatients] = useState([])

  const allUsers = async () => {
    try {
      const response = await axiosInstance.get("/doctor/get-patient-info");
      console.log("patients list", response.data.data)
      setAllPatients(response.data.data);
    } catch (error) {
      toast.error(error.message || "some thing went wrong");
    }
  }

useEffect(() => {
  allUsers();

},[]);


  return (
    <div>
      <main className={styles.mainContainer}>
        <section>
          <div className={styles.sectionOne}>
            <h1>Wellcome back, Dr Raheel Ahmed </h1>
            <p>Here is what is happening with your clinic today</p>
            <div className={styles.StatsCard}>
              <StatusCard
                title={"Users"}
                value={"20"}
                icon={<UserCheckIcon />}
                variant={"redVariant"}
              />
              <StatusCard
                title={"CalendarChek"}
                value={"12"}
                icon={<Calendar className={styles.statsIcon}/>}
                variant={"redVariant"}
              />
              <StatusCard
                title={"Report List"}
                value={"33"}
                icon={<FaListAlt />}
                variant={"redVariant"}
              />
              <StatusCard
                title={"Activity"}
                value={"45"}
                icon={<Activity />}
                variant={"redVariant"}
              />
            </div>
          </div>
        </section>

        <section>
          <div className={styles.patientsList}>
            <table>
              <thead>
                <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Age</th>
                <th>Blood Group</th>
                <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
              {allPatients.map((patient, index) => (
                  <tr>
                  <td>{index}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.bloodGroup}</td>
                    <td>{patient.phone}</td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Doctors;
