import React, { useState, useRef,  useEffect } from 'react'
import './ProductDetail.css'
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useGetProductByIdQuery } from '../../redux/Api/ProductsApi.js';
import { useSelector} from 'react-redux';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { useNavigate } from 'react-router-dom';
import { useAddProductToCartMutation } from '../../redux/Api/OderApi.js';
import { message, InputNumber } from 'antd';


export const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [sizeId, setSizeId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [inStock, setInStock] = useState(true);

  console.log("Quantity: ", quantity);

  const toastBC = useRef(null);
  const refs = {
    description: useRef(null),
    brand: useRef(null),
    material: useRef(null),
  };
  const navigate = useNavigate();
  const { productId } = useParams();
  const user = useSelector(state => state.userLogin.userInfo);
  const [addProductToCart] = useAddProductToCartMutation();

  const { data, error, isLoading } = useGetProductByIdQuery({ productId: productId });
  const product = data ? data.data : '';

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const name = product.product.name.toUpperCase();
  const image = 'http://localhost:5001/' + product.product.image_url;
  const sizes = product.options;
  const attributes = product.attributes;

  const clear = () => {
    toastBC.current.clear();
    setVisible(false);
  }

  const navigateLogIn = () => {
    clear();
    navigate('/login');
  }

  const handleAddToCart = async () => {
    if(user) {
      if(sizeId) {
        console.log("user: ", user.data.id, " quantity: ", quantity, " size: ", sizeId, "product: ", product.product.id);
        const body = { productId, quantity, sizeId };
        const res = await addProductToCart({ body, userId: user.data.id }).unwrap();

        if(res.success === false)
          message.error(res.message);
        else {
          navigate('/cart');
        }
      }
      else {
        message.error('Choose size, please!');
      }
    }
    else {
      if (!visible) {
        setVisible(true);
        toastBC.current.clear();
        toastBC.current.show({
            severity: 'success',
            summary: 'Please, Log In to add product to cart!',
            sticky: true,
            content: (props) => (
                <div className="toast-add-to-cart" style={{ flex: '1' }}>
                    <div className="toast-add-cart-text">{props.message.summary}</div>
                    <Button className="toast-add-cart-button" label="Log In" severity="success" onClick={navigateLogIn}></Button>
                </div>
            )
        });
    }
    }
  }

  return (
    <div className='product-detail-page flex-row'>

      {/* Image Slider */}
      <div className="product-images ">
        <Slide>
              <div className="each-slide-effect">
                  <div style={{ 'backgroundImage': `url(${image})` }}>
                  </div>
              </div>
        </Slide>
      </div>


      <div className="product-info flex-column">

        <div className="product-header flex-row">

          <h2>{name}</h2>
          <div className="product-price">
            $ {product.product.price}
          </div>

        </div>

        <hr />

        <div className="product-info-details flex-column">

          <div className="options-container flex-column">
            {
              sizes.length !== 0 ? <div className="sizes flex-column">

              <h3>SIZE</h3>


              <div className="size-options flex-row">
                { sizes.map((size, index) => {
                  return (
                    <div className='size' key={size.id} onClick={() => {setSizeId(size.id)}} style={{background: sizeId === size.id ? 'var(--beige-color)' : 'inherit'}}>{size.name}</div>
                  )
                }) }
              </div>

              </div> : <p className='out-of-stock'>OUT OF STOCK</p>
            }

            <div className="sizes flex-column">

              <h3>QUANTITY</h3>
              <InputNumber size="large" min={1} max={10} defaultValue={1} value={quantity} onChange={(value) => {setQuantity(value)}} />

            </div>

          </div>

          <button className='add-to-cart-button' onClick={handleAddToCart} disabled={sizes.length === 0}>Add to cart</button>

        </div>

        <Toast ref={toastBC} position="top-center" className={visible ? "toast-custom" : ""} onRemove={clear} />
        <hr />

        <div className="product-attribes flex-column">
          <Panel ref={refs.description} header="DESCRIPTION" toggleable collapsed={true}>
              <p className="attributes-p">
                {product.product.description}
              </p>
          </Panel>
        </div>

        <hr />

        <div className="product-attribes flex-column">
          <Panel ref={refs.brand} header="BRAND" toggleable collapsed={true}>
              <p className="attributes-p">
                {product.product.Manufacturer.name}
              </p>
          </Panel>
        </div>

        <hr />

        <div className="product-attribes flex-column">
          <Panel ref={refs.material} header="DETAILS" toggleable collapsed={true}>
            { product ? product.attributes.map((item, index) => {
                  return (
                    <p key={index} className="attributes-p">
                      {item.name} : {item.value}
                    </p>
                  )
                }): ''}
          </Panel>
        </div>

        <hr />

      </div>

      <div className="recommended-po-mozluvosti"></div>
    </div>
  )
}
