import React, { useState } from 'react';
import { useGetAttributesQuery } from '../../redux/Api/CategoriesApi';
import {  Select, Input, message} from 'antd';
import './AddProduct.css'

export const Attribute = ({setProductAttributes}) => {
    const [attribute, setAttribute] = useState('');
    const [value, setValue] = useState('');
    const {data} = useGetAttributesQuery();
    const attributes = data ? data.data : [];

    const handleAddAttribute = (event) => {
        if(value !== '' && value !== null || attribute !== '')
        {
            const newAttribute = { attribute: attribute, value: value };
            setProductAttributes(prevAttributes => [...prevAttributes, newAttribute]);
            message.success('Add attribute successfully');
        }
    };
  return (
    <div className="add-product-attributes flex-column">
        <span className='main-info-header'>Attributes</span>
        <Select
            onChange = {(value) => {setAttribute(value)}}
            placeholder='Attribute'
            style={{
                width: 255,
            }}
            options={attributes.map(attributes => ({
                value: attributes.id,
                label: attributes.name,
            }))}
        />
        <Input placeholder="Option" allowClear value={value} onChange={(e) => { setValue(e.target.value) }}/>
        <button className='add-sizes-button' onClick={handleAddAttribute}>Add</button>
    </div>
  )
}
