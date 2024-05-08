import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5001/api/'}),
    endpoints: (build) => ({
        getCategories: build.query({
            query: (parentId = '') => `shop/categories/list?${parentId && `parentCategoryId=${parentId}`}`,
        }),
        getManufacturers: build.query({
            query: () => `shop/products/manufacturerList`,
        }),
        getSizes: build.query({
            query: () => `shop/products/sizeList`,
        }),
        getAttributes: build.query({
            query: () => `shop/products/attributeList`,
        }),
    })
});
export const {useGetCategoriesQuery, useGetManufacturersQuery, useGetSizesQuery, useGetAttributesQuery} = categoriesApi;