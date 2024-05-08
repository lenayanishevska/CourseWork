import React from 'react'
import "./DropDownMenu.css"

export const DropDownMenu = ({  menu }) => {
  return (

    <div className='menu' style={{ display: menu === "women" || menu === "men" ? 'block' : 'none' }}>

    </div>
  )
}
