import React from 'react';
import styles from './loader.module.css'; // CSS module import

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loader;