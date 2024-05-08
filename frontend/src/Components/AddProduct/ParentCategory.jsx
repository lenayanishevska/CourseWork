import React from 'react'
import './AddProduct.css'
import { useGetCategoriesQuery } from '../../redux/Api/CategoriesApi';
import {  Select, } from 'antd';

export const ParentCategory = ({setParentCategory, parentCategory}) => {
    const {data} = useGetCategoriesQuery();
    const categories = data ? data.data : [];
  return (
    <div className="add-product-select flex-column">
    <span className='add-product-info-header'>Category</span>
    <Select
        onChange = {(value) => {setParentCategory(value)}}
        placeholder='Category'
        style={{
            width: 200,
        }}
        options={categories.map(category => ({
            value: category.id,
            label: category.name,
        }))}
    />
    </div>
  )
}
