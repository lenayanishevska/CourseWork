import React from 'react'
import {  Select, } from 'antd';
import './AddProduct.css'
import { useGetCategoriesQuery } from '../../redux/Api/CategoriesApi';

export const Category = ({parentCategory, setCategory, category}) => {
    const parentId = parentCategory ? parentCategory : 2
    const {data} = useGetCategoriesQuery(parentId);
    const subcategories = data ? data.data : [];
  return (
    <div className="add-product-select flex-column">
        <span className='add-product-info-header'>Subcategory</span>
        <Select
            onChange = {(value) => {setCategory(value)}}
            placeholder='Subcategory'
            style={{
                width: 200,
            }}
            options={subcategories.map(category => ({
                value: category.id,
                label: category.name,
            }))}
        />
    </div>
  )
}
