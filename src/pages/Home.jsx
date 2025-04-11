import React from 'react'
import Hero from '../Componnets/Hero'
import LatestCollection from '../Componnets/LatestCollection'
import BestSelar from '../Componnets/BestSelar'
import OurPolice from '../Componnets/OurPolice'
import NewsLetterBox from '../Componnets/NewsLetterBox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSelar/>
      <OurPolice/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home