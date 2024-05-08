import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import "react-paginate/theme/basic/react-paginate.css";
import {  Input, Select} from 'antd';
const { Search } = Input;


export const UserManager = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [sortField, setSortField] = useState('last_name');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [filterParams, setFilterParams] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const sort = {
    sortField: sortField,
    sortOrder: sortOrder,
  }

  const onSearch = (value) => {
    const filteredList = list.filter(item => item.last_name.toLowerCase().includes(value.toLowerCase()));
    console.log(filteredList);
    setList(filteredList);
  };


  const reload = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5001/api/admin/users?page=${page}&itemPerPage=20&sort=${JSON.stringify(sort)}`)
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

  const handleReset = () => {
    setSearchValue('');
    reload();
  };

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    reload();
  }, [sortField, sortOrder]);

  useEffect(() => {
    reload();
  }, [page]);


  const changePage = ({selected}) => {
    setPage(selected);
  }

  return (
    <div className="orders flex-column">
      <div className="orders-header">
        <h2>Users</h2>
      </div>

      <div className="order-filters-sorts flex-row">
      <div className="order-search flex-row">
          <Search
          placeholder="Search"
          onSearch={onSearch}
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            width: 200,
          }}
        />
          <button onClick={handleReset}>Reset</button>
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
                        value: 'last_name ASC',
                        label: 'Last name (asc)',
                        },
                        {
                        value: 'last_name DESC',
                        label: 'Last name (desc)',
                        },
                        {
                        value: 'email ASC',
                        label: 'Email (asc)',
                        },
                        {
                        value: 'email DESC',
                        label: 'Email (desc)',
                        },
                    ]}
                    
                />
        </div>
      </div>

      <div className="table center-flex">
        <table  className="orders-table" >
          <thead>
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.first_name} {item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.UserAddress ? item.UserAddress.address : "No address"}</td>
                <td>{item.UserAddress ? item.UserAddress.city: "No address"}</td>
                <td>{item.UserAddress ? item.UserAddress.country: "No address"}</td>
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
