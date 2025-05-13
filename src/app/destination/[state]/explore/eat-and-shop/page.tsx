'use client'
import React from 'react'
import { useDestination } from '../../DestinationContext.jsx'
import styles from "../explore.module.css";
import EatAndShop from './EatAndShop.jsx';


const page = () => {
  const destination = useDestination()

  return (
    <EatAndShop/>
  )
}

export default page