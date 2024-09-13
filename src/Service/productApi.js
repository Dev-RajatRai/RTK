import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  tagTypes: ["Product", "Category", "Cart"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit, offset }) => `/products?limit=${limit}&offset=${offset}`,
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getCategories: builder.query({
      query: () => "/products/categories",
      providesTags: ["Category"],
    }),
    getProductsByCategory: builder.query({
      query: ({ category, limit, offset }) =>
        `/products/category/${category}?limit=${limit}&offset=${offset}`,
      providesTags: ["Product"],
    }),
    getCartByUserId: builder.query({
      query: (userId) => `/carts?userId=${userId}`,
      providesTags: ["Cart"],
    }),
    getProductsLimited: builder.query({
      query: (limit) => `/products?limit=${limit}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Product"],
    }),
    patchProduct: builder.mutation({
      query: ({ id, ...updatedFields }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: updatedFields,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetCartByUserIdQuery,
  useGetProductsLimitedQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  usePatchProductMutation,
  useDeleteProductMutation,
} = productApi;
