import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";
import styles from "./patientList.module.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/all-patients");
      if (res.data.success) {
        setPatients(res.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "error to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    // Best Practice: Confirm before delete
    if (!window.confirm("Are you sure you want to delete the patient record")) return;

    try {
      const res = await axiosInstance.post(`/admin/delete-patient?id=${id}`);
      if (res.data.success) {
        toast.success("Patient record deleted!");
        // State update taake page refresh na karna pare
        setPatients((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Hospital Patient Directory</h2>
        <p className={styles.subtitle}>Manage and view all registered patients</p>
      </div>

      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
          <p>Fetching clinical records...</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S/No</th>
                <th>Patient Name</th>
                <th>Contact Info</th>
                <th>Age</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? (
                patients.map((value, index) => (
                  <tr key={value._id} className={styles.rowAnimation}>
                    <td>{index + 1}</td>
                    <td className={styles.nameCell}>{value.name}</td>
                    <td>
                      <div className={styles.contactInfo}>
                        <span>{value.email}</span>
                        <small>{value.phone || "No Phone"}</small>
                      </div>
                    </td>
                    <td>{value.age || "N/A"}</td>
                    <td><span className={styles.badge}>Active</span></td>
                    <td className={styles.actions}>
                      <button className={styles.editBtn} title="Edit">
                        <LuPencilLine />
                      </button>
                      <button 
                        className={styles.deleteBtn} 
                        onClick={() => handleDelete(value._id)}
                        title="Delete"
                      >
                        <LuTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className={styles.noData}>No records found in the system</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientList;