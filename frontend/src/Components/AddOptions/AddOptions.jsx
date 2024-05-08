import React from 'react'
import "./AddOptions.css"
import { AddManufacturer } from './AddManufacturer'
import { AddAttributes } from './AddAttributes'
import { AddSize } from './AddSize'
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { saveAs } from 'file-saver';
import axios from "axios";
import { AddCategory } from './AddCategory'

export const AddOptions = () => {
    const handleExport = () => {
        axios({
          url: 'http://localhost:5001/api/admin/exportCSV',
          method: 'GET',
          responseType: 'blob', 
        })
          .then((response) => {
            const blob = new Blob([response.data], { type: 'text/csv' }); 
            saveAs(blob, 'products.csv'); 
          })
          .catch((error) => {
            console.error('Error while exporting:', error);
          });
      };
  return (
    <div className='add-options flex-column'>
        <span className='add-product-header add-options-header'>ADD OPTIONS</span>
        <div className="export-csv flex-row">
                <span className='export-header'>Export Products in CSV: </span>
                <Button style={{ background: '#716D69' }} type="primary" shape="round" icon={<DownloadOutlined />} onClick={handleExport} />
        </div>
        <div className="options-containers flex-row">
            <AddManufacturer/>
            <AddAttributes></AddAttributes>
            <AddSize></AddSize>
            <AddCategory/>
        </div>


    </div>
  )
}
