import React, { useEffect, useState } from 'react'
import './Cart.css'
import { CartProduct } from '../../Components/CartProduct/CartProduct'
import { useCreateOrderMutation, useGetOrderProductsQuery } from '../../redux/Api/OderApi'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderInfo } from '../../redux/Reducers/OrderReducer';
import { message } from 'antd';
import axios from "axios";


export const Cart = () => {
  const user = useSelector(state => state.userLogin.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const [createOrder] = useCreateOrderMutation();

  if(!user) {
    console.log("User was not found");
  }

  const userId = user.data.id;

  const reload = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5001/api/shop/products/cartProductList?userId=${userId}`)
      .then((response) => {
        console.log(response)
        setIsError(false);
        setIsLoading(false);
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


  const handleCreateOrder = async () => {
    if(user.data.address) {
      const res = await createOrder({ userId: user.data.id }).unwrap();
      console.log(res);
      if(res.success === false){
        message.error(res.message)
      }
      else{
        dispatch(setOrderInfo(res));
        navigate('/orderInfo');
      }
    }
    else {
      message.error("Please, add your address in profile and log in again!")
    }
  }


  const total = list.reduce((accumulator, item) => {
    return accumulator + item.amount;
  }, 0).toFixed(2);

  return (
    <div className='shopping-cart flex-row'>

      <div className="cart-products flex-column">
        <h2>Shopping Cart</h2>
        <div className="table-headers flex-column">
          <hr />
          <div className="cart-product-content flex-row">
              <div className="cart-image-name flex-row">
                  <span>Item</span>
              </div>
              <div className='cart-product-option'>Price</div>
              <div className='cart-product-option'>Size</div>
              <div className="cart-product-option">Quantity</div>
              <div className="cart-product-option">Total</div>
              <div className="cart-product-option">Delete</div>
          </div>
        </div>
        {
          list.map((item) => {
              return (
                  <CartProduct key={item.id} item={item} reload={reload}/>
              )
        })}
      </div>

      <div className="cart-summary flex-column ">
        <div className="cart-summary-container flex-column">
          <div className="summary">
            <h3>Summary</h3>
            <hr />
          </div>
          <div className="order-price-content flex-row">
            <span>Total price: </span>
            <div className="order-price">$ {total}</div>
          </div>
          <button onClick={handleCreateOrder}>Buy Now</button>
        </div>
        <div className='back-to-shop' 
          onClick={() => {
            navigate('/');
          }}>
          Back to shopping
        </div>
      </div>

    </div>
  )
}
