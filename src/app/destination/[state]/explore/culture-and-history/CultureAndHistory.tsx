import React from 'react';

import styles from '../explore.module.css';
import { useDestination } from '../../DestinationContext';

const CultureAndHistory = () => {
  const destination = useDestination();

  return (
    <div>
      <h2 className="">Culture & History</h2>
      <div
        dangerouslySetInnerHTML={{ __html: destination?.acf?.explore?.culture_and_history }}
        className="prose max-w-none"
      ></div>
    </div>
  );
};

export default CultureAndHistory;
