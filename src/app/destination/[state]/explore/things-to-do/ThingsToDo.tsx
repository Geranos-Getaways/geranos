import React from 'react'

import styles from "../explore.module.css";
import { useDestination } from '../../DestinationContext';

const ThingsToDo = () => {
    const destination = useDestination()
  
    
    return (
      <div>
        <h2 className='mb-3 text-4xl font-semibold'>Things To Do</h2>
        <div dangerouslySetInnerHTML={{__html: destination?.acf?.explore?.things_to_do}} className={styles.explore}>
  
        </div>
      </div>
    )
  }

export default ThingsToDo
