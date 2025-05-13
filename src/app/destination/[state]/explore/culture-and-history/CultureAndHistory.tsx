import React from 'react'

import styles from "../explore.module.css";
import { useDestination } from '../../DestinationContext';


const CultureAndHistory = () => {
    const destination = useDestination()
  return (
    <div>
      <h2 className='mb-3 text-4xl font-semibold'>Culture & History</h2>
      <div dangerouslySetInnerHTML={{__html: destination?.acf?.explore?.culture_and_history}} className={styles.explore}>

      </div>
    </div>
  )
}

export default CultureAndHistory