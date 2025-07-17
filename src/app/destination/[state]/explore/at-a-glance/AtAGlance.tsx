import React from 'react';

import styles from '../explore.module.css';
import { useDestination } from '../../DestinationContext';

const AtAGlance = () => {
  const destination = useDestination();

  return (
    <div>
      <h2 className="">At A Glance</h2>
      <div
        dangerouslySetInnerHTML={{ __html: destination?.acf?.explore?.at_a_glance }}
        className={styles.explore}
      ></div>
    </div>
  );
};

export default AtAGlance;
