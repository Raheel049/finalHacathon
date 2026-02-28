import React, { useState } from 'react';
import styles from './receptionists.module.css';
import Navbar from './navbar';

const Receptionists = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [staff, setStaff] = useState([
    { id: 1, name: "Ayesha Malik", email: "ayesha@clinic.com", shift: "Morning", phone: "0300-1234567" },
    { id: 2, name: "Bilal Ahmed", email: "bilal@clinic.com", shift: "Evening", phone: "0312-9876543" },
  ]);

  const [newStaff, setNewStaff] = useState({ name: "", email: "", shift: "Morning", phone: "" });

  // 🔍 Filter Logic
  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = (e) => {
    e.preventDefault();
    setStaff([...staff, { ...newStaff, id: Date.now() }]);
    setShowModal(false);
    setNewStaff({ name: "", email: "", shift: "Morning", phone: "" });
  };

  const deleteStaff = (id) => {
    if(window.confirm("Remove this staff member?")) {
        setStaff(staff.filter(s => s.id !== id));
    }
  };

  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div className={styles.container}>
      <div className={styles.header}>
        <h2 className="text-2xl font-bold text-slate-800">Receptionist Management</h2>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>+ Add Staff</button>
      </div>

      <div className={styles.actionBar}>
        <input 
          type="text" 
          placeholder="Search by name..." 
          className={styles.searchInput}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Shift</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((s) => (
              <tr key={s.id}>
                <td className="font-semibold">{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>
                  <span className={`${styles.shiftBadge} ${s.shift === 'Morning' ? styles.morning : styles.evening}`}>
                    {s.shift}
                  </span>
                </td>
                <td>
                  <button onClick={() => deleteStaff(s.id)} className="text-red-500 hover:text-red-700 cursor-pointer">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ADD STAFF MODAL --- */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className="text-xl font-bold mb-4">Register Receptionist</h3>
            <form onSubmit={handleAddStaff}>
              <div className={styles.formGroup}>
                <label>Staff Name</label>
                <input required type="text" placeholder="Full Name" value={newStaff.name} onChange={(e) => setNewStaff({...newStaff, name: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input required type="email" placeholder="email@clinic.com" value={newStaff.email} onChange={(e) => setNewStaff({...newStaff, email: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input required type="text" placeholder="03xx-xxxxxxx" value={newStaff.phone} onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label>Work Shift</label>
                <select value={newStaff.shift} onChange={(e) => setNewStaff({...newStaff, shift: e.target.value})}>
                    <option value="Morning">Morning (8AM - 4PM)</option>
                    <option value="Evening">Evening (4PM - 12AM)</option>
                </select>
              </div>
              <button type="submit" className={styles.saveBtn}>Add to System</button>
              <button type="button" onClick={() => setShowModal(false)} className="w-full bg-slate-100 text-slate-600 mt-2 p-3 rounded-lg">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Receptionists;