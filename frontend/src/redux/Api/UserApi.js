import axios from "axios";

const loginService = async (user) => {
    const {data} = await axios.post('http://localhost:5001/api/users/login', user);
    if(data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
    }

    return data;
};

const logoutService = async () => {
    localStorage.removeItem('userInfo');
    return null;
};

const registerService = async (user) => {
    const {data} = await axios.post('http://localhost:5001/api/users/registration', user);
    if(data) {
        localStorage.setItem('userInfo', JSON.stringify(data))
    }

    return data;
}
export {loginService, logoutService, registerService};


