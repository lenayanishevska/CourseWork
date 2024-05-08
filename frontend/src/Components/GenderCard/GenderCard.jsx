import React from 'react'
import './GenderCard.css'

export const GenderCard = ({image, text}) => {
  return (
    <div className='card center-flex'>
        <img src={image} alt="" />
        <h2>{text}</h2>
    </div>
  )
}
