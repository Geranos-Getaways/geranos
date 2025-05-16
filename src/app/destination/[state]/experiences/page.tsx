import React from 'react'
import ExperiencesCards from './experiencesCards'

interface PageProp {
  params: {
    state: string
  }
}

const Page = ({ params }: PageProp) => {
  const { state } = params
  console.log("PAGE: State: ", state)

  return (
    <ExperiencesCards state={state} />
  )
}

export default Page
