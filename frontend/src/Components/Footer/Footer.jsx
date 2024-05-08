import React from 'react'
import './Footer.css'

export const Footer = () => {
  return (
    <div className='footer center-flex'>
        <div className="container flex-row">
            <div className='options center-flex'>PASSION</div>
            <div  className='options center-flex'>CATEGORIES</div>
            <div className='options center-flex'>HELP</div>
            <div className='options center-flex'>FIND US</div>
        </div>
        <div className="container flex-row">
            <div className="footer-parts flex-column">
                <p>PASSION - store where you find your perfect clothes for your perfect 
                    looks that give you confidence and passion. <span style={{ color: 'var(--red-color)' }}>Shine bright, queen!</span></p>
            </div>
            <div className="footer-parts flex-column">
                <ul>
                    <li>WOMEN</li>
                    <li>MEN</li>
                    <li>ABOUT US</li>
                </ul>
            </div>
            <div className="footer-parts flex-column">
                <ul>
                    <li>CONTACT US</li>
                    <li>PAYMENT</li>
                    <li>RETURN</li>
                </ul>
            </div>
            <div className="footer-parts flex-column">
                <ul>
                    <li>INSTAGRAM</li>
                    <li>FACEBOOK</li>
                    <li>TIKTOK</li>
                </ul>
            </div>
            
        </div>

    </div>
  )
}
