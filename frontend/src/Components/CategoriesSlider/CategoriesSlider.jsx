import React, { useState } from 'react'
import './CategoriesSlider.css'
// import {categories} from '../../data.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';


export default function CategoriesSlider({subcategories,setFilterParams}) {
    const [isClicked, setIsClicked] = useState('');

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,

    };

  return (
    <div className="slider-container">
        <div className='slider'>
            <Slider {...settings}>
                {subcategories.map((item) => {
                    return (
                        <div key={item.id} className='category-item' onClick={() => {
                            setIsClicked(item.name);
                            setFilterParams(prevParams => ({
                                ...prevParams,
                                CategoryId: !item.id ? null : item.id
                              }));
                            }}>
                            <h3 style={{color: isClicked === item.name ? '#AC5656' : 'inherit'}}>{item.name}  </h3>
                            {/* {isClicked === item.name? <hr/>: <></>} */}
                        </div>
                    )
                })}
            </Slider>
        </div>
    </div>

  )
}
