import React from 'react';
import QwixxGrid from '../../components/QwixxGrid';
import styles from '../../styles/Qwixx.module.css';

const Qwixx = () => {
  return (
    <div className={styles.container}>
      <QwixxGrid />
    </div>
  );
};

export default Qwixx;
