import React from 'react'
import './OrderInfo.css'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearOrderInfo } from '../../redux/Reducers/OrderReducer';
import moment from 'moment';

export const OrderInfo = () => {
    const orderInfo = useSelector(state => state.orderInfo.data);
    console.log(orderInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClearOrderInfo = () => {
        dispatch(clearOrderInfo());
        navigate('/');
      };

    const products = orderInfo.data.orderProductList;

  return (
    <div className='order flex-column'>
    <div className="order-details flex-column">
      <div className="order-info flex-column">
        <span className='order-header'>Order Details</span>
        <span className='verified'>Successufully verified</span>
        <hr />
        <div className="order-products-content flex-column">
            {products.map((item) => {
                return (
                    <div key={item.id} className="order-product-info flex-row">
                        <span>{item.Product.name}</span>
                        <span>$ {item.Product.price}</span>
                    </div>
                )
            })}
        </div>
        <hr />
        <div className="order-product-info flex-row">
            <span>Total Amount:</span>
            {orderInfo? <span>$ {orderInfo.data.order.total_amount}</span> : <></>}
        </div>
        <div className="order-product-info flex-row">
            <span>Date:</span>
            {orderInfo? <span> {moment(orderInfo.data.order.date).format('YYYY-MM-DD HH:mm:ss')}</span>: <></>}
        </div>
      </div>
      <hr />
      <span className='thanks'>Thank you for your order!</span>
      <div className="profile-buttons flex-row">
        <button className='lodout-button' onClick={handleClearOrderInfo}>Back to shop</button>
      </div>
    </div>
  </div>
  )
}
