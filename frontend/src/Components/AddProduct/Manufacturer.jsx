import React from 'react'
import './AddProduct.css'
import { useGetManufacturersQuery } from '../../redux/Api/CategoriesApi';
import {  Select } from 'antd';

export const Manufacturer = ({setManufacturer, manufacturer}) => {
    const {data} = useGetManufacturersQuery();
    const manufacturers = data ? data.data : [];
  return (
    <div className="add-product-select flex-column">
        <span className='add-product-info-header'>Manufacturer</span>
        <Select
            onChange = {(value) => {setManufacturer(value)}}
            placeholder='Manufacturer'
            style={{
                width: 200,
            }}
            options={manufacturers.map(manufacturer => ({
                value: manufacturer.id,
                label: manufacturer.name,
            }))}
        />
    </div>
  )
}
