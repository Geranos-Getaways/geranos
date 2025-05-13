'use client'
import React from 'react'
import { useDestination } from '../../DestinationContext'
import styles from "../explore.module.css";
import EatAndShop from './EatAndShop';


const Page = () => {
  const destination = useDestination()

  return (
    <EatAndShop/>
  )
}

export default Page