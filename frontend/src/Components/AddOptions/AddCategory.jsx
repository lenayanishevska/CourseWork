import React, { useEffect, useState } from 'react'
import { Button, Modal, Input, Form,Select } from 'antd';
import {  EditOutlined } from '@ant-design/icons';
import axios from "axios";
import { useGetCategoriesQuery } from '../../redux/Api/CategoriesApi';

export const AddCategory = () => {
    const [category, setCategory] = useState('');
    const [parentCategory, setParentCategory] = useState(1);
    const [list, setList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');


    const showModal = (itemId, ItemName) => {
      setIsModalOpen(true);
      setItemId(itemId);
      setItemName(ItemName);
    };

    const handleOk = () => {
      console.log(itemName);
      axios({
        method: "POST",
        url: "http://localhost:5001/api/shop/category/update",
        data: { id: itemId, name: itemName },
      }).then((data) => {
        console.log("Result: ", data);
        reload();
      }).catch((error) => {
        alert(error);
      });
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const {data} = useGetCategoriesQuery();
    const parentCategories = data ? data.data : [];

    const reload = () => {
        setIsLoading(true);
        axios
          .get(`http://localhost:5001/api/shop/categories/list?parentCategoryId=${parentCategory}`)
          .then((response) => {
            setIsError(false);
            setIsLoading(false);
            console.log(response.data.data);
            setList(response.data.data);
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
    }, [parentCategory]);
    

      const AddCategory = () => {
        axios({
          method: "POST",
          url: "http://localhost:5001/api/shop/categories/create",
          data: { name: category, parentCategoryId: parentCategory },
        }).then((data) => {
            setCategory('');
            reload();
        }).catch((error) => {
          alert(error);
        });
      };


  return (
    <div className='add-manufacturer flex-column'>
        <div className="add-manufacturer-input flex-row">
            <div className="add-product-select flex-column">
              <span className='add-input-name'>Category</span>
              <Select
                  onChange = {(value) => {setParentCategory(value)}}
                  placeholder='Category'
                  style={{
                      width: 80,
                  }}
                  options={parentCategories.map(category => ({
                      value: category.id,
                      label: category.name,
                  }))}
              />
            </div>
            <div className="manufacturer-input-name flex-column">


                <span className='add-input-name'>Subcategory:</span>
                <div className="flex-row">
                    <Input placeholder="Manufacturer" 
                            allowClear 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                </div>
            </div>
            <button className='add-options-button'  onClick={AddCategory} >Add</button>
        </div>
        <div className="table add-options-table">
            <table  className="orders-table" >
            <thead>
                <tr>
                <th>Name</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <Button type="primary" onClick={() => {
                        showModal(item.id, item.name);
                      }} icon={<EditOutlined />} style={{ background: '#716D69' }}>
                      </Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            <Modal title="Add Size" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Input placeholder="Name" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                      </Modal>
      </div>
    </div>
  )
}
