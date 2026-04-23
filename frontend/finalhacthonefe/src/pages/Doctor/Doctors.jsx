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
  const [searchValue, setSearchValue] = useState("");
  const [doctorData, setDoctorData] = useState([])

  const allUsers = async () => {
    try {
      const response = await axiosInstance.get("/doctor/get-patient-info");
      console.log("patients list", response.data.data)
      if(response.data.status === true || response.data.status === 200){
      setAllPatients(response.data.data);

      }
    } catch (error) {
      toast.error(error.message || "some thing went wrong");
    }
  }

    const filteredPatients = allPatients.filter((patient) => {
    const searchedUsers = searchValue.toLowerCase()

   const matchSearch = patient.name?.toLowerCase().includes(searchedUsers) || patient.phone?.toLowerCase().includes(searchedUsers)
  
   return matchSearch

  })

  const getCurrDoctorData = async () => {
    try {

      const token = localStorage.getItem("token");



      const response = await axiosInstance.get("/doctor/curr-doctor-data",{
        headers : {Authorization : token}
      });

      if(response.data.status === true || response.data.status === 200){
        setDoctorData(response.data.data)
      }
      console.log("response of Data of Doctor", response);
    } catch (error) {
      toast.error(error.message || "Doctor Not Found");
    }
  }

useEffect(() => {
  allUsers();
  getCurrDoctorData();

},[]);


  return (
    <div>
      <main className={styles.mainContainer}>
        <section>
          <div className={styles.sectionOne}>
            <h1>Wellcome back, {doctorData.name} </h1>
            <p>Here is what is happening with your clinic today</p>
            <div className={styles.StatsCard}>
              <StatusCard
                title={"Users"}
                value={"20"}
                icon={<UserCheckIcon className={styles.statsIcon}/>}
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
                icon={<FaListAlt className={styles.statsIcon}/>}
                variant={"redVariant"}
              />
              <StatusCard
                title={"Activity"}
                value={"45"}
                icon={<Activity className={styles.statsIcon}/>}
                variant={"redVariant"}
              />
            </div>
          </div>
        </section>

        <section>
          <div className={styles.searchPatient}>
            <label htmlFor="Search">Search Patient</label>
            <input type="text" placeholder="Search Patient..." onChange={(e) => {setSearchValue(e.target.value)}}/>

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
              {filteredPatients.map((patient, index) => (
                  <tr key={index}>
                  <td>{index+1}</td>
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
