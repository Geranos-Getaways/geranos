'use client'
import React from 'react'

import styles from "../explore.module.css";
import CultureAndHistory from './CultureAndHistory.tsx';
import { useDestination } from '../../DestinationContext';


const page = () => {
  const destination = useDestination()

 
  return (
   <CultureAndHistory/>
  )
}

export default page