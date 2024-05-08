import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5001/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().userLogin.userInfo.data.token;
            if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (build) => ({
        getOrderProducts: build.query({
            query: (userId = '') => `shop/products/cartProductList?${userId && `userId=${userId}`}`,
        }),
        getUserOrders: build.query({
            query: (userId = '') => `shop/userOrders?${userId && `userId=${userId}`}`,
        }),
        addProductToCart: build.mutation({
            query: ({ body, userId }) => ({
                url: `shop/products/addProductToCart?${userId ? `userId=${userId}` : ''}`,
                method: 'POST',
                body,
            }),
        }),
        deleteProductFromCart: build.mutation({
            query: ({ orderProductId }) => ({
                url: `shop/products/deleteFromCart?${orderProductId ? `orderProductId=${orderProductId}` : ''}`,
                method: 'DELETE',
            }),
        }),
        deleteUserOrder: build.mutation({
            query: ({ orderId }) => ({
                url: `shop/products/deleteFromCart?${orderId ? `orderId=${orderId}` : ''}`,
                method: 'DELETE',
            }),
        }),
        createOrder: build.mutation({
            query: ({ userId }) => ({
                url: `shop/products/createOrder?${userId ? `userId=${userId}` : ''}`,
                method: 'POST',
            }),
        }),
    }),
});
export const {useGetOrderProductsQuery, useAddProductToCartMutation, useDeleteProductFromCartMutation, useCreateOrderMutation, useGetUserOrdersQuery} = orderApi;