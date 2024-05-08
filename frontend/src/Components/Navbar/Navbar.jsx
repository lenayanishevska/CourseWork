import React, { useEffect } from 'react'
import './Navbar.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';

import { UpperNavBar } from '../UpperNavBar/UpperNavBar'
import exit from '../../assets/icons/sign-out.png'
import profile from '../../assets/icons/profile.png'
import parcel from '../../assets/icons/parcel.png'
import { logoutAction } from '../../redux/Actions/UserActions'
import toast from 'react-hot-toast';
import { useGetCategoriesQuery } from '../../redux/Api/CategoriesApi';

export const Navbar = () => {
    const [menu,setMenu] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data} = useGetCategoriesQuery();
    const categories = data ? data.data : [];
    const user = useSelector(state => state.userLogin.userInfo);

    const handlerLogout = () => {
        dispatch(logoutAction());
        toast.success('Logged out successfully!');
        navigate('/login');
    }

    const handlerProfile = () => {
        user === ( null || undefined ) ? navigate('/login'): navigate('/profile')
    }

    useEffect(() => {
        setMenu("");
    }, []);

  return (
    <div className='full-navbar'>
        <UpperNavBar />
        <nav className="navbar flex-div">
            <div className="nav-left flex-row">
                {categories.map((item) => {
                    return (
                        <h2 key={item.id} onClick={() => setMenu(item.name)}>
                            <Link to={`/products/${item.id}`}>{item.name}</Link> {menu === item.name?<hr/>: <></>} 
                        </h2>
                    )
                })}

            </div>

            <div className="nav-middle center-flex">
                <Link to='/'><h1>PASSION</h1></Link>
            </div>

            <div className="nav-right flex-row">
                <img src={profile} alt="" onClick={handlerProfile}/>
                <Link to='/cart'><img src={parcel} alt=""/></Link>
                <img src={exit} alt="" onClick={handlerLogout}/>
            </div>
        </nav>
    </div>
  )
}
