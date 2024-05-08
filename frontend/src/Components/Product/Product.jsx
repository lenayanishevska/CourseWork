import React from 'react'
import './Product.css'

export default function Product({item}) {
  return (
    <div className='product flex-column'>
        <img src={'http://localhost:5001/'+item.image_url} alt="" />
        <div className="info flex-column">
            <div className="name-like flex-row">
                <h3>{item.name}</h3>
            </div>
            <div className="price">$ {item.price}</div>
        </div>
    </div>
  )
}
