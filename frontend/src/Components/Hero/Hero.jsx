import React from 'react'
import './Hero.css'
import main_image from '../../assets/pictures/main_image.png'
import { Link } from 'react-router-dom'

export const Hero = () => {
    const backgroundImageStyle = {
        backgroundImage: `url(${main_image})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center'
      };
  return (
    <div className='hero-img' style={backgroundImageStyle}>
    </div>
  )
}
