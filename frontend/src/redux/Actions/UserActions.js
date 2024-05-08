import * as Types from '../Constants/AllConstants';
import * as Apies from '../Api/UserApi';
import {toast} from 'react-hot-toast';
import { ErrorAction } from '../Protection';

const logoutAction = () => async (dispatch) => {
    try {
        dispatch({ type: Types.USER_LOGOUT});
        dispatch({ type: Types.USER_LOGIN_RESET});
        await Apies.logoutService();
    } catch (error) {
        toast.error('Logout failed');
    }
};

const loginAction = (user) => async (dispatch) => {
    try {
        dispatch({type: Types.USER_LOGIN_REQUEST});
        const data = await Apies.loginService(user);
        dispatch({type: Types.USER_LOGIN_SUCCESS, payload: data});
    } catch (error) {
        ErrorAction(error, dispatch, Types.USER_LOGIN_FAIL);
    }
};


const registerAction = (user) => async (dispatch) => {
    try {
        dispatch({type: Types.USER_REGISTER_REQUEST});
        const data = await Apies.registerService(user);
        dispatch({type: Types.USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: Types.USER_LOGIN_SUCCESS, payload: data});
        toast.success(`Welcome to Passion, ${data.firstName}`);
    } catch (error) {
        ErrorAction(error, dispatch, Types.USER_REGISTER_FAIL);
    }
};

export {loginAction, logoutAction, registerAction};