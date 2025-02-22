import axios from 'axios';
import { ProductsResponse, Product } from '../types/product';
import { ProductDetailsResponse } from '../types/product';

export const BASE_URL = 'https://prodapp.lifepharmacy.com/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async ({ pageParam = 0 }) => {
  const response = await api.get<ProductsResponse>('/products', {
    params: {
      skip: pageParam * 20,
      take: 20,
    },
  });
  
  return {
    data: response.data.data.products,
    hasMore: true, // If we got full page, assume there's more
  };
};

export const getProductDetails = async (slug: string) => {
  const response = await api.get<ProductDetailsResponse>(`/product/${slug}`);
  return response.data.data;
}; 