import React from 'react'
import { useDestination } from '../../DestinationContext'
import styles from "../explore.module.css";

const TravelTips = () => {
    const destination = useDestination()
  
    
    return (
      <div>
        <h2 className='mb-3 text-4xl font-semibold'>Travel Tips</h2>
        <div dangerouslySetInnerHTML={{__html: destination?.acf?.explore?.travel_tips}} className={styles.explore}>
  
        </div>
      </div>
    )
  }
export default TravelTips