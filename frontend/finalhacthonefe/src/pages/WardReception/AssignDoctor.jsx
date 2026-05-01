// import React, { useState } from 'react'
// import styles from "./AssignDoctor.module.css"
// import SelectPatient from './selectPatient'
// import UpadatePatientForm from './patientForm'


// const AssignDoctor = () => {

//   const [formData, setFormData] = useState([]);
//   const [isFormOpen, setIsFormOpen] = useState(false)

//   const handleAssignDoctor = (patientData) => {
//     setFormData(patientData);
//   }

//   return (
//     <div>
//         <main>
//             <section>
//                 <div className={styles.mainContainer}>
//                     {
//                       isFormOpen ? <SelectPatient assignDoctor={handleAssignDoctor} /> : <UpadatePatientForm />
//                     }
//                 </div>
//             </section>
//         </main>
//     </div>
//   )
// }

// export default AssignDoctor