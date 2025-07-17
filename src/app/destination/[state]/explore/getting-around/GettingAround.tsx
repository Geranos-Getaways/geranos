import React from 'react';
import styles from '../explore.module.css';
import { useDestination } from '../../DestinationContext';

const GettingAround = () => {
  const destination = useDestination();

  return (
    <div>
      <h2 className="">Getting Around</h2>
      <div
        dangerouslySetInnerHTML={{ __html: destination?.acf?.explore?.getting_around }}
        className={styles.explore}
      ></div>
    </div>
  );
};

export default GettingAround;
