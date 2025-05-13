'use client'
import React from 'react'
import { useDestination } from '../../DestinationContext.jsx'
import styles from "../explore.module.css";
import CultureAndHistory from './CultureAndHistory.jsx';


const page = () => {
  const destination = useDestination()

 
  return (
   <CultureAndHistory/>
  )
}

export default page