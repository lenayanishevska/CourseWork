import React, { useState } from 'react'
import './GenderCategory.css'
import CategoriesSlider from '../../Components/CategoriesSlider/CategoriesSlider'
import { useParams } from "react-router-dom";
import Products from '../../Components/Products/Products';
import { useGetCategoriesQuery, useGetManufacturersQuery } from '../../redux/Api/CategoriesApi';
import {  Input, Select} from 'antd';
const { Search } = Input;

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { brown, grey } from '@mui/material/colors';
import ReactPaginate from 'react-paginate';
import "react-paginate/theme/basic/react-paginate.css";

export const GenderCategory = () => {
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [manufacturer, setManufacturer] = useState();
  const [filterParams, setFilterParams] = useState({});
  const [list, setList] = useState([]);
  const [value, setValue] = useState([1, 100]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const {category} = useParams();

  
  const onSearch = (value) => {
    setSearchValue(value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilterParams(prevParams => ({
      ...prevParams,
      fromPrice: parseFloat(value[0]),
      toPrice: parseFloat(value[1]),
    }));
  };

  const handleReset = () => {
    setFilterParams({});
    setManufacturer(null);
    setValue([1, 100]);
    setSearchInputValue('');
    setSearchValue('');
  };

  const changePage = ({selected}) => {
    setPage(selected);
  }


  const {data} = useGetCategoriesQuery(category);
  const subcategories = data ? data.data : [];

  const {data: manufacturerList} = useGetManufacturersQuery();
  const manufacturers = manufacturerList ? manufacturerList.data : [];

  const sortParams = {
    sortField: sortField,
    sortOrder: sortOrder,
  }

  const productParams = {
    category: category,
    sortParams: sortParams,
    filterParams: filterParams,
    searchValue: searchValue,
  };

  const header = category === '1'? 'Men\'s': 'Women\'s';

  return (
    <div className='catalog-page'>
      <CategoriesSlider subcategories={subcategories} setFilterParams={setFilterParams}/>
      <div className="main-content flex-row">
        <div className="filters-container flex-column">
          <div className="filters flex-column">
            <h3>Brands</h3>
            <FormGroup>
              {manufacturers.map((item, index) => {
                return (
                  <FormControlLabel key={index} sx={{ color: grey[800] }} control={<Checkbox sx={{
                    color: brown[600],
                    '&.Mui-checked': {
                      color: brown[400],
                    },
                  }}/>} 
                  checked={manufacturer === item.id} 
                  onChange={(e) => {
                    setManufacturer(item.id);
                    setFilterParams(prevParams => ({
                      ...prevParams,
                      manufacturer: !item.id ? null : item.id
                    }));
                  }}
                  label={item.name}/>
                )
              })}
            </FormGroup>
          </div>
          <div className="filters flex-column">
            <h3>Prices</h3>
            <Box sx={{ width: 300 }}>
              <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={1} 
                max={1000}
                sx={{
                  '& .MuiSlider-thumb': {
                      color: '#AC5656',
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0px 0px 0px 8px rgba(172, 86, 86, 0.16)',
                    },
                  },
                  '& .MuiSlider-track': {
                      color: '#AC5656',
                  },
                  '& .MuiSlider-rail': {
                      color: '#ccc', 
                  },
                  '& .MuiSlider-valueLabel': {
                      color: '#AC5656', 
                  },
                  '& .MuiSlider-valueLabel': {
                    color: '#AC5656',
                    backgroundColor: '#B8B2AA',
                  },
              }}
              />
            </Box>
          </div>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className="catalog flex-column">
          <div className="catalog-header flex-row">
            <h2>{header} Cloth</h2>
            <div className="order-search flex-row">
              <Search
              placeholder="Search"
              onSearch={onSearch}
              value={searchInputValue} 
              onChange={(e) => setSearchInputValue(e.target.value)}
              style={{
                width: 200,
              }}
              />
            </div>
            <div className="order-sort flex-row">
                    
                    <Select
                        onChange={(value) => {
                            const [option, order] = value.split(' ');
                            setSortField(option);
                            setSortOrder(order);
                        }}
                        placeholder='Sort By'
                        style={{
                            width: 150,
                        }}
                        options={[
                            {
                            value: 'name ASC',
                            label: 'Name (asc)',
                            },
                            {
                            value: 'name DESC',
                            label: 'Name (desc)',
                            },
                            {
                            value: 'price ASC',
                            label: 'Price (asc)',
                            },
                            {
                            value: 'price DESC',
                            label: 'Price (desc)',
                            },
                        ]}
                        
                    />
            </div>
          </div>

          <div className="products-list flex-column">
            <Products params={productParams} setPage={setPage} setPageCount={setPageCount} page={page} setList={setList} list={list}/>
            <div className="catalog-paginator">

              <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={changePage}
              pageRangeDisplayed={500}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              className="react-paginate"
              forcePage={page}
              pageLinkClassName="active" // Додаємо клас для активної сторінки
              activeLinkClassName="active-link"
              previousClassName="page"
              nextClassName="page"
              containerClassName="pagination"
              pageClassName="page" // Додаємо клас для кожної сторінки
              />

            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
