import React from 'react';
import styles from '../explore.module.css';
import { useDestination } from '../../DestinationContext';

const TravelEtiquettes = () => {
  const destination = useDestination();

  return (
    <div>
      <h2 className="mb-3 text-4xl font-semibold">Travel Etiquettes</h2>
      <div
        dangerouslySetInnerHTML={{ __html: destination?.acf?.explore?.travel_etiquettes }}
        className={styles.explore}
      ></div>
    </div>
  );
};

export default TravelEtiquettes;
