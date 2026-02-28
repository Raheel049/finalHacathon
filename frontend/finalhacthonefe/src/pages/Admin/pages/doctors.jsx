import React, { useState } from 'react';
import styles from './doctors.module.css';
import Navbar from '../navbar';

const Doctors = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Sarah Khan", spec: "Cardiologist", email: "sarah@clinic.com", status: "Active" },
    { id: 2, name: "Dr. Faisal Rehman", spec: "Neurologist", email: "faisal@clinic.com", status: "Active" },
  ]);

  const [newDoctor, setNewDoctor] = useState({ name: "", spec: "", email: "", status: "Active" });

  // 🔍 Search Logic
  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.spec.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ➕ Add Doctor Logic
  const handleAddDoctor = (e) => {
    e.preventDefault();
    setDoctors([...doctors, { ...newDoctor, id: Date.now() }]);
    setShowModal(false);
    setNewDoctor({ name: "", spec: "", email: "", status: "Active" });
  };

  // 🗑️ Delete Logic
  const deleteDoctor = (id) => {
    if(window.confirm("Are you sure?")) {
        setDoctors(doctors.filter(d => d.id !== id));
    }
  };

  return (
    <div>
        <div>
            <Navbar />
        </div>
        
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className="text-2xl font-bold">Doctor Management</h2>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>+ Register Doctor</button>
      </div>

      <div className={styles.actionBar}>
        <input 
          type="text" 
          placeholder="Search by name or specialty..." 
          className={styles.searchInput}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Specialty</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doc) => (
              <tr key={doc.id}>
                <td className="font-semibold text-blue-900">{doc.name}</td>
                <td>{doc.spec}</td>
                <td>{doc.email}</td>
                <td>
                  <span className={`${styles.statusBadge} ${doc.status === 'Active' ? styles.active : styles.inactive}`}>
                    {doc.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => deleteDoctor(doc.id)} className="text-red-500 hover:underline cursor:pointer">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ADD DOCTOR MODAL --- */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className="text-xl font-bold mb-4">Add New Doctor</h3>
            <form onSubmit={handleAddDoctor}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input required type="text" placeholder="e.g. Dr. Ali" value={newDoctor.name} onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>Specialization</label>
                <input required type="text" placeholder="e.g. Heart Specialist" value={newDoctor.spec} onChange={(e) => setNewDoctor({...newDoctor, spec: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input required type="email" placeholder="email@clinic.com" value={newDoctor.email} onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select value={newDoctor.status} onChange={(e) => setNewDoctor({...newDoctor, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button type="submit" className={styles.saveBtn}>Save Doctor</button>
                <button type="button" onClick={() => setShowModal(false)} className="w-full bg-gray-200 mt-2 p-3 rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Doctors;