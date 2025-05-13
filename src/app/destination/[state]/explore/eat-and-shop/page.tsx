'use client'
import React from 'react'
import { useDestination } from '../../DestinationContext.tsx'
import styles from "../explore.module.css";
import EatAndShop from './EatAndShop.tsx';


const page = () => {
  const destination = useDestination()

  return (
    <EatAndShop/>
  )
}

export default page