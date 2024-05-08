import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const expensesApi = createApi({
    reducerPath: 'expensesApi',
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
        getCategories: build.query({
            query: () => `/shop/expenses/categoriesList`,
        }),
        addExpenses: build.mutation({
            query: (body) => ({
                url: 'shop/expenses/create',
                method: 'POST',
                body,
            }),
        }),
    })
});
export const {useGetCategoriesQuery, useAddExpensesMutation} = expensesApi;