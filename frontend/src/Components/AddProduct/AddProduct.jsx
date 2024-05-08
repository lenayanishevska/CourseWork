import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Input, Select, InputNumber, } from 'antd';
import "./AddProduct.css"
import { ParentCategory } from './ParentCategory';
import { Category } from './Category';
import { Manufacturer } from './Manufacturer';
import { useGetSizesQuery } from '../../redux/Api/CategoriesApi';
import { Attribute } from './Attribute';
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

export const AddProduct = () => {
    const [file, setFile] = useState(null);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState(0);
    const [parentCategory, setParentCategory] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [manufacturer, setManufacturer] = useState('');
    const [productSizes, setProductSizes] = useState([]);
    const [productAttributes, setProductAttributes] = useState([]);
    const [uploading, setUploading] = useState(false);

    const {data} = useGetSizesQuery({});
    const sizes = data ? data.data : [];

    const selectBefore = (
        <Select
          onChange = {(value) => {setSize(value)}}
          placeholder='size'
          style={{
            width: 100,
          }}
        >
            {sizes.map(size => (
                <Option key={size.id} value={size.id}>{size.name}</Option>
            ))}
        </Select>
    );

    const handleAddSize = (event) => {
        if(quantity !== 0 && quantity !== null || size !== '')
        {
            const newSize = { size: size, quantity: quantity };
            setProductSizes(prevSizes => [...prevSizes, newSize]);
            message.success('Add attribute successfully')
        }
    };

    const handleUpload = () => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('sku', sku);
        formData.append('price', parseFloat(price));
        formData.append('category', category);
        formData.append('manufacturer', manufacturer);
        formData.append('productSizes', JSON.stringify(productSizes));
        formData.append('productAttributes', JSON.stringify(productAttributes));

        axios.post('http://localhost:5001/api/shop/products/createProduct', formData)
            .then((response) => {
                console.log(response.data);
                setFile(null);
                setProductName('');
                setProductDescription('');
                setSku('');
                setPrice(0);
                setParentCategory('');
                setCategory('');
                setManufacturer('');
                setProductSizes([]);
                setProductAttributes([]);
                message.success('Upload successfully.');
            })
            .catch((error) => {
                console.error('Error while uploading:', error);
                message.error('Upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

  return (
    <div className='add-product flex-column'>
      <span className='add-product-header'>ADD PRODUCT</span>
      <div className="add-product-container flex-row">
        <div className="main-product-info flex-column">
          <span className='main-info-header'>Main Info</span>
          <div className="add-product-info flex-column">
            <span className='add-product-info-header'>Product Name:</span>
            <Input placeholder="Product Name" 
                allowClear 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="add-product-info flex-column">
            <span className='add-product-info-header'>Product Description:</span>
            <TextArea rows={4} placeholder='Description' 
                allowClear
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div className="add-price-SKU flex-row">
            <div className="add-product-input flex-column">
                <span className='add-product-info-header'>Product Price:</span>
                <InputNumber addonAfter="$" defaultValue={1} value={price} onChange={(value) => setPrice(value)} />
            </div>
            
            <div className="add-product-input flex-column">
                <span className='add-product-info-header'>Product SKU:</span>
                <Input placeholder="Product SKU" 
                allowClear 
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                />
            </div>
          </div>
          <div className="add-categories-brand flex-row">
            <ParentCategory parentCategory={parentCategory} setParentCategory={setParentCategory}></ParentCategory>
            <Category parentCategory={parentCategory} setCategory={setCategory} category={category}></Category>
            <Manufacturer setManufacturer={setManufacturer} manufacturer={manufacturer}></Manufacturer>

          </div>

          <div className="file-upload flex-column">
            <span className='add-product-info-header'>Add product image:</span>
            <Upload
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}
              onRemove={(file) => {
                setFile(null);
                return false;
              }}
              fileList={file ? [file] : []}
            >
              <Button icon={<UploadOutlined />} 
                style={{
                    width: 200,
                    color: '#716D69',
                }}
              >Select File</Button>
            </Upload>

          </div>
        </div>
        <div className="additional-product-info flex-column">
            <div className="add-product-sizes flex-column">
                <span className='main-info-header'>Sizes</span>
                <InputNumber addonBefore={selectBefore}  defaultValue={0} min={0} value={quantity} onChange={(value) => setQuantity(value)} />
                <button className='add-sizes-button' onClick={handleAddSize}>Add</button>
            </div>
            <Attribute setProductAttributes={setProductAttributes} ></Attribute>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={!file || !productName || !productDescription || !sku || !price || !category || !parentCategory || !manufacturer}
                loading={uploading}
                style={{ marginTop: 10 }}
                className='add-sizes-button'
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
        </div>
      </div>
    </div>
  );
};
