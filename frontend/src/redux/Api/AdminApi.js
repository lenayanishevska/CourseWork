import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().userLogin.userInfo.data.token;
        if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    }),
    endpoints: (build) => ({
        getMonthInfo: build.query({
            query: () => `/admin/monthInfo`,
        }),
    })
});
export const {useGetMonthInfoQuery} = adminApi;