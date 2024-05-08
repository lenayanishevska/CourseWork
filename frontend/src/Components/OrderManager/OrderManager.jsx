import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderManager.css"
import ReactPaginate from 'react-paginate';
import "react-paginate/theme/basic/react-paginate.css";
import moment from 'moment'; 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { saveAs } from 'file-saver';


export const OrderManager = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [status, setStatus] = useState('');
  const [filterParams, setFilterParams] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState([1, 100]);

  const sort = {
    sortField: sortField,
    sortOrder: sortOrder,
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilterParams(prevParams => ({
      ...prevParams,
      fromPrice: parseFloat(value[0]),
      toPrice: parseFloat(value[1]),
    }));
  };

  const handleExport = () => {
    axios
      .get(`http://localhost:5001/api/admin/export`)
      .then((response) => {
        const exportData = response.data.data;
        const jsonData = JSON.stringify(exportData , null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        saveAs(blob, 'orders_with_users.json');
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      });
  };


  const reload = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5001/api/admin/orders?page=${page}&itemPerPage=20&sort=${JSON.stringify(sort)}&filters=${JSON.stringify(filterParams)}`)
      .then((response) => {
        setIsError(false);
        setIsLoading(false);
        setList(response.data.data.list);
        setPageCount(response.data.data.pageCount);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    reload();
  }, [sortField, sortOrder, value, status]);

  useEffect(() => {
    reload();
  }, [page]);

  const completeOrder = (orderId) => {
    axios({
      method: "POST",
      url: "http://localhost:5001/api/admin/updateOrder",
      data: { id: orderId, status: "Completed" },
    }).then((data) => {
      reload();
    }).catch((error) => {
      alert(error);
    });
  };

  const changePage = ({selected}) => {
    setPage(selected);
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setFilterParams(prevParams => ({
      ...prevParams,
      status: ! event.target.value !== '' ? event.target.value : null
    }));
  };

  const handleReset = () => {
    setFilterParams({});
    setStatus("");
    setValue([1, 100]);
  };

  return (
    <div className="orders flex-column">
      <div className="orders-header">
        <h2>ORDERS</h2>
      </div>

      <div className="order-filters-sorts flex-row">
        <div className="status-filter flex-row">
          <FormControl sx={{ mb: 1}} >
            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ '&.Mui-focused': { color: '#AC5656' } }}>Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={status} // Встановлюємо значення статусу
              onChange={handleStatusChange} // Обробник для зміни значення статусу
            >
              <FormControlLabel value="" control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#AC5656' }}}/>} label="All" sx={{ fontSize: 'small' }}/>
              <FormControlLabel value="Processing" control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#AC5656' }}}/>} label="Processing" sx={{ fontSize: 'small' }}/>
              <FormControlLabel value="Completed" control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#AC5656' }}}/>} label="Completed" sx={{ fontSize: 'small' }}/>

            </RadioGroup>
          </FormControl>

          <div className="orders-price flex-column">
            <span>Prices</span>
            <Box sx={{ width: 200}}>
              <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                size="small"
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
                    backgroundColor: '#B8B2AA',
                  },
              }}
              />
              </Box>
          </div>


          <button onClick={handleReset}>Reset</button>

          <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={handleExport} />
          
        </div>
        <div className="order-sort flex-row">
              <select onChange={(e) => {
                const [option, order] = e.target.value.split(' ');
                setSortField(option);
                setSortOrder(order);
              }}>
                <option value="date DESC">Sort by</option>
                <option value="total_amount ASC">price (asc)</option>
                <option value="total_amount DESC">price (desc)</option>
                <option value="date ASC">date (asc)</option>
                <option value="date DESC">date (desc)</option>
              </select>
        </div>
      </div>

      <div className="table center-flex">
        <table  className="orders-table" >
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Total amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{moment(item.date).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>$ {item.total_amount}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === "Processing" ? (
                    <button className="complete-order-button"
                      onClick={() => {
                        completeOrder(item.id);
                      }}
                    >
                      COMPLETE
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="order-paginator">

      <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={changePage}
      pageRangeDisplayed={5}
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
  );
};
