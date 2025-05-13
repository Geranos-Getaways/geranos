import React from 'react'
import { useDestination } from '../../DestinationContext';
import styles from "../explore.module.css";


const EatAndShop = () => {
    const destination = useDestination()
  return (
    <div>
      <h2 className='mb-3 text-4xl font-semibold'>Eat & Shop</h2>
      <div dangerouslySetInnerHTML={{__html: destination?.acf?.explore?.eat_and_shop}} className={styles.explore}>

      </div>
    </div>
  )
}

export default EatAndShop