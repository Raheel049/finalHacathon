import { useState, useEffect } from "react";
import styles from "./PatientAppointment.module.css";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";

const PatientAppointment = ({ initialData, resetStep }) => {
  const [patientData, setPatientData] = useState({
    patientMobile: "",
    patientName: "",
    patientId: "",
    email: "",
    doctorName: "",
    date: "",
    time: "",
    wardName: "",
    status: "Pending",
    feeStatus: "Unpaid",
  });

  const [doctor, setDoctor] = useState([]);

  const allDoctorsName = async () => {
    try {
      const response = await axiosInstance.get("/reception/get-all-doctors-name");

      if(response.data.status === true || response.data.status === 200){
      setDoctor(response.data.data)

      }

      console.log("DoctorsName",response.data.data)

    } catch (error) {
      toast.error(error.message || "Some thing went wrong!")
    }
  }


  useEffect(() => {
    if (initialData) {
      setPatientData((prev) => ({
        ...prev,
        patientName: initialData.name,
        patientMobile: initialData.phone,
        patientId: initialData._id,
        email: initialData.email,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    allDoctorsName();
  },[]);

  // console.log(patientData);

  const createAppointment = async () => {
    try {
      const res = await axiosInstance.post(
        "/reception/patient-appointment",
        patientData
      );
      if (res.data.success) {
        toast.success("Patient Appointment create Successfully");
        setPatientData({
          doctorName: "",
          date: "",
          time: "",
          wardName: "",
        });
        resetStep()
      }
    } catch (error) {
      toast.error("error", error.message);
    }
  };

  const handleInput = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.glassContainer}>
      <button className={styles.backBtn} onClick={resetStep}>
        ← Back
      </button>
      <form className={styles.gridForm} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputBox}>
          <label>Patient Name</label>
          <input
            type="text"
            name="patientName"
            value={patientData.patientName}
            readOnly
            className={styles.readOnly}
          />
        </div>
        <div className={styles.inputBox}>
          <label>Mobile</label>
          <input
            type="text"
            name="patientMobile"
            value={patientData.patientMobile}
            readOnly
            className={styles.readOnly}
          />
        </div>
        <div className={styles.inputBox}>
          <label>Select Doctor</label>
          
            <select name="doctorName"
            onChange={handleInput}
            className={styles.glassInput}>

              <option value="">Select</option>

              {doctor.map((doctorName, index) => (
              <option value={doctorName.name} key={index}>{doctorName.name}</option>
              ))}


            </select>
        </div>
        <div className={styles.inputBox}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            onChange={handleInput}
            className={styles.glassInput}
          />
        </div>
        <div className={styles.inputBox}>
          <label>Time</label>
          <input
            type="time"
            name="time"
            onChange={handleInput}
            className={styles.glassInput}
          />
        </div>
        <div className={styles.inputBox}>
          <label>Ward Name</label>
          <input
            type="text"
            name="wardName"
            placeholder="Ward/Cabin"
            onChange={handleInput}
            className={styles.glassInput}
          />
        </div>
        <div className={styles.inputBox}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={patientData.email}
            readOnly
            onChange={handleInput}
            className={styles.readOnly}
          />
        </div>
        <button
          type="submit"
          onClick={createAppointment}
          className={styles.submitBtn}
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default PatientAppointment;
