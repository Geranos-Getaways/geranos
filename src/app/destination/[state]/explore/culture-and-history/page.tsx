'use client'
import React from 'react'

import styles from "../explore.module.css";
import CultureAndHistory from './CultureAndHistory';
import { useDestination } from '../../DestinationContext';


const Page = () => {
  const destination = useDestination()

 
  return (
   <CultureAndHistory/>
  )
}

export default Page