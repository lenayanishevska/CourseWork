import React from 'react'
import './Home.css'
import { Hero } from '../../Components/Hero/Hero'
import { GenderCard } from '../../Components/GenderCard/GenderCard'
import { Footer } from '../../Components/Footer/Footer'
import women from '../../assets/pictures/women.png'
import men from '../../assets/pictures/men.png'

export const Home = () => {
  return (
    <div>
        <Hero/>
        <div className="gender-cards flex-row center-flex">
            <GenderCard image={women} text={"WOMEN"}></GenderCard>
            <GenderCard image={men} text={"MEN"}></GenderCard>
        </div>
        <hr />
        {/* <Footer/> */}
    </div>
  )
}
