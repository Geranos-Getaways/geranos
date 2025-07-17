import React from 'react'

import styles from "../explore.module.css";
import { useDestination } from '../../DestinationContext';

const TravelTips = () => {
    const destination = useDestination()
  
    
    return (
      <div>
        <h2 className=''>Travel Tips</h2>
        <div dangerouslySetInnerHTML={{__html: destination?.acf?.explore?.travel_tips}} className={styles.explore}>
  
        </div>
      </div>
    )
  }
export default TravelTips