import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchScreen from '../app/index';
import { getProducts } from '../api/client';

// Mock the API client
jest.mock('../api/client', () => ({
  getProducts: jest.fn()
}));

// Mock data
const mockProducts = {
  data: [
    {
      id: '1',
      title: 'Test Product 1',
      slug: 'test-product-1',
      images: { featured_image: 'https://example.com/image1.jpg' },
      sale: {
        currency: 'AED',
        regular_price: 100,
        offer_price: 80,
        offer_label: '20% OFF',
      },
      rating: '4.5',
      stock: { max: 10, delivery_icons: [] },
      categories: []
    },
    // Add more mock products as needed
  ],
  hasMore: false
};

describe('SearchScreen', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('renders loading state initially', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <SearchScreen />
      </QueryClientProvider>
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders products after loading', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <SearchScreen />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('Test Product 1')).toBeTruthy();
    });
  });

  it('filters products based on search query', async () => {
    const { getByPlaceholderText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <SearchScreen />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const searchInput = getByPlaceholderText('Search products...');
      fireEvent.changeText(searchInput, 'Test Product 1');
      expect(queryByText('Test Product 1')).toBeTruthy();
    });
  });
}); 