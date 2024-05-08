import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useSelector} from 'react-redux';

export const userAddressApi = createApi({
    reducerPath: 'userAddressApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/'}),
    endpoints: (build) => ({
        getAddress: build.query({
            query: (userId = '') => `users/getAddress?${userId && `userId=${userId}`}`,
        }),
        addAddress: build.mutation({
            query: (body) => ({
                url: 'users/addAddress',
                method: 'POST',
                body,
            }),
        }),
    })
});
export const {useGetAddressQuery, useAddAddressMutation} = userAddressApi;