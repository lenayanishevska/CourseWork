import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import axios from "axios";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddAddressMutation, useGetAddressQuery } from '../../redux/Api/UserAddressApi';
import { useGetUserOrdersQuery } from '../../redux/Api/OderApi';
import moment from 'moment'; 

export const Profile = () => {
  const user = useSelector(state => state.userLogin.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("User id: ", user.data.id)

  const { data, refetch} = useGetAddressQuery(user.data.id);
  const address = (data === undefined || data.success === false) ? '' : data.data;

  const userId = user.data.id;
  const { data: orders} = useGetUserOrdersQuery(userId);
  const userOrders = orders ? orders.data : [];



  const [addAddress] = useAddAddressMutation({});
  

  useEffect(() => {
    refetch();
  }, [user.data.id]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reload = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5001/api/shop/userOrders?userId=${userId}`)
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


  const cancelOrder = (orderId) => {
    axios({
      method: "DELETE",
      url: `http://localhost:5001/api/shop/deleteFromUserOrders?orderId=${orderId}`,
    }).then((data) => {
      console.log(data);
      reload();
    }).catch((error) => {
      alert(error);
    });
  };

  return (
    <div className='profile flex-column'>
      <div className="profile-user-header"><h3>HELLO, {user.data.first_name.toUpperCase()}</h3></div>
      <div className="profile-details flex-column">
        <div className="user-info flex-column">
          <span>My Profile Details</span>
          <hr />
          <div className="details-info flex-column">
            <span>Email:</span>
            <p>{user.data.email}</p>
          </div>
          <div className="details-info flex-column">
            <span>First Name:</span>
            <p>{user.data.first_name}</p>
          </div>
          <div className="details-info flex-column">
            <span>Last Name:</span>
            <p>{user.data.last_name}</p>
          </div>
        </div>
        <hr />
        <div className="user-address flex-column">
          <div className="user-address-header flex-row">
            <h3>Address</h3>
            {
              address === '' ? <span onClick={handleClickOpen}>Edit</span>
              : <></>
            }
              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  component: 'form',
                  onSubmit: async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const address = formJson.address;
                    const city = formJson.city;
                    const country = formJson.country;
                    const zipcode = formJson.zipcode;

                    await addAddress({address: address, city: city, country: country, zipcode: zipcode, userId: user.data.id}).unwrap();

                    handleClose();
                  },
                }}
              >
                <DialogTitle>Add Address</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="city"
                    label="City"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="country"
                    label="Country"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="zipcode"
                    label="Zipcode"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Add</Button>
                </DialogActions>
              </Dialog>
          </div>
          <hr />
          <div className="user-adsress-info">
            {
              address === '' ? <h3>No address added!</h3> 
              : <div className="address-info flex-column">
                  <span>Street:</span>
                  <p>{address.address}</p>
                  <span>City:</span>
                  <p>{address.city}</p>
                  <span>Country:</span>
                  <p>{address.country}</p>
                </div>
            }
          </div>
        </div>
        <hr />
        <div className="profile-buttons flex-row">
          {
            user.data.is_admin ?<Link to='/admin'><button className='admin-button'>Admin Panel</button></Link> : <></>
          }
        
        </div>
        <hr />
        <div className="center-flex user_orders">
          <span>YOUR ORDERS</span>
          <table  className="orders-table user-orders-table" >
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
                          cancelOrder(item.id);
                        }}
                      >
                        CANCEL
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
