import { combineReducers, configureStore} from "@reduxjs/toolkit";
import * as user from './Reducers/UserReducer';
import { categoriesApi } from "./Api/CategoriesApi";
import { productsApi } from "./Api/ProductsApi";
import { userAddressApi } from "./Api/UserAddressApi";
import { orderApi } from "./Api/OderApi";
import { expensesApi } from "./Api/ExpesesApi";
import { adminApi } from "./Api/AdminApi";
import OrderSlice from "./Reducers/OrderReducer";

const rootReducer = combineReducers({
    userLogin : user.LoginReducer,
    userRegister: user.RegisterReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userAddressApi.reducerPath]: userAddressApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [expensesApi.reducerPath]: expensesApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    orderInfo: OrderSlice,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck:false,
            immutableCheck: false,
        }).concat(categoriesApi.middleware, productsApi.middleware, userAddressApi.middleware, orderApi.middleware, expensesApi.middleware, adminApi.middleware),
});