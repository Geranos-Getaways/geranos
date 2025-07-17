import React from 'react'

import styles from "../explore.module.css";
import { useDestination } from '../../DestinationContext';

const ThingsToDo = () => {
    const destination = useDestination()
  
    
    return (
      <div>
        <h2 className=''>Things To Do</h2>
        <div dangerouslySetInnerHTML={{__html: destination?.acf?.explore?.things_to_do}} className={styles.explore}>
  
        </div>
      </div>
    )
  }

export default ThingsToDo
