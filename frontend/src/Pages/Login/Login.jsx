import React, {useEffect, useState} from 'react'
import './Login.css'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/Actions/UserActions';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = {email:email, password:password};
  const redirect = state?.from ? state.from : '/';

  const {
    userLogin: {loading, userInfo, error }
  } = useSelector((state) => state);

  const handlerSubmitLogin = () => {
    dispatch(loginAction(data));
  }


  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch({type: 'USER_LOGIN_RESET'});
    }

    if(userInfo) {
      navigate(redirect);
    }
  }, [dispatch, error, userInfo, navigate, redirect]);

  return (
    <div className='login-page center-flex'>
      <div className="login flex-column">
        <span className='header'>Sign in</span>
        <div className="login-container flex-column">
          <div className="inputs flex-column">
            <input type="text"  placeholder='Enter e-mail' onChange={(e) => setEmail(e.target.value)}/>
            <input type="password"  placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className="inputs flex-column">
            <button disabled={loading} className='black' onClick={handlerSubmitLogin}>Sign In</button>
            <Link to='/registration'><button className='white'>Create Account</button></Link>
          </div>
        </div>

      </div>
    </div>
  )
}
