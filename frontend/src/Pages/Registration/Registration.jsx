import React, {useEffect, useState} from 'react'
import './Registration.css'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../redux/Actions/UserActions';
import toast from 'react-hot-toast';

export const Registration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = {fullName: fullName, email:email, password:password};
  const redirect = state?.from ? state.from : '/';


  const {
    userRegister: {loading, userInfo, error }
  } = useSelector((state) => state);

  const handlerSubmitRegister = () => {
    dispatch(registerAction(data));
  }

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch({type: 'USER_REGISTER_RESET'});
    }

    if(userInfo) {
      navigate(redirect);
    }
  }, [dispatch, error, userInfo, navigate, redirect]);

  return (
    <div className='login-page center-flex'>
      <div className="login flex-column">
        <span className='header'>Create account</span>
        <div className="login-container flex-column">
          <div className="inputs flex-column">
            <input type="text"  placeholder='Enter full name' onChange={(e) => setFullName(e.target.value)} />
            <input type="text"  placeholder='Enter e-mail' onChange={(e) => setEmail(e.target.value)} />
            <input type="password"  placeholder='Enter password' onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className="inputs flex-column">
            <button disabled={loading} className='black' onClick={handlerSubmitRegister} >Create account</button>
            <span className='sign-in'><Link to='/login'>Sign In</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}
