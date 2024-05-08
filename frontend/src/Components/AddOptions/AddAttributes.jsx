import React, { useEffect, useState } from 'react'
import { Button, Modal, Input, Form, } from 'antd';
import {  EditOutlined } from '@ant-design/icons';
import axios from "axios";

export const AddAttributes = () => {
    const [attribute, setAttribute] = useState('');
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
        url: "http://localhost:5001/api/shop/attribute/update",
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


    const reload = () => {
        setIsLoading(true);
        axios
          .get(`http://localhost:5001/api/shop/products/attributeList`)
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

      const addAttribute = () => {
        axios({
          method: "POST",
          url: "http://localhost:5001/api/shop/attributes/create",
          data: { name: attribute },
        }).then((data) => {
            setAttribute('');
            reload();
        }).catch((error) => {
          alert(error);
        });
      };


  return (
    <div className='add-manufacturer flex-column'>
        <div className="add-manufacturer-input flex-row">
            <div className="manufacturer-input-name flex-column">
                <span className='add-input-name'>Attribute Name:</span>
                <Input placeholder="Attribute" 
                        allowClear 
                        value={attribute}
                        onChange={(e) => setAttribute(e.target.value)}
                    />
            </div>
            <button className='add-options-button' onClick={addAttribute}>Add</button>
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
