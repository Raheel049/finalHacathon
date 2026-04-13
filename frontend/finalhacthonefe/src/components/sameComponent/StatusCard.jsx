import React from "react";
import styles from "./StatusCard.module.css";

const StatusCard = ({ title, value, icon: Icon, variant }) => {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.desCont}>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
      <div>{Icon}</div>
    </div>
  );
};

export default StatusCard;
