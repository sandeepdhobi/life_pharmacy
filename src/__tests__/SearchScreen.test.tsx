import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchScreen from '../app/SearchScreen';
import { getProducts } from '../api/client';
import { router } from 'expo-router';

jest.mock('../api/client');
jest.mock('@expo/vector-icons', () => ({
  FontAwesome: () => 'Icon'
}));
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn()
  }
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

const mockSearchResponse = {
  success: true,
  message: "Products fetched successfully",
  data: {
    products: [{
      id: "test-id",
      title: "Test Product",
      slug: "test-product",
      images: {
        featured_image: "https://example.com/image.jpg",
        featured_video: null
      },
      sale: {
        currency: "AED",
        regular_price: 100,
        offer_price: 80,
        offer_label: "20% OFF",
        offer_type: "discount",
        vat_text: "Including VAT",
        member_price: 0,
        subscription_price: 0
      },
      categories: [{
        id: "1",
        name: "Test Category"
      }],
      stock: {
        max: 5,
        delivery_icons: []
      }
    }]
  }
};

describe('SearchScreen', () => {
  beforeEach(() => {
    (getProducts as jest.Mock).mockResolvedValue(mockSearchResponse);
    jest.clearAllMocks();
  });

  it('shows loading indicator initially', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <SearchScreen />
      </QueryClientProvider>
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays products grid after loading', async () => {
    const { getAllByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <SearchScreen />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const productCards = getAllByTestId('product-card');
      expect(productCards).toHaveLength(mockSearchResponse.data.products.length);
      expect(getByText('Muscle Core 100% Whey Platinum Standard 5 Lb Chocolate')).toBeTruthy();
    });
  });

  it('handles product card click', async () => {
    const { getAllByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <SearchScreen />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const productCard = getAllByTestId('product-card')[0];
      fireEvent.press(productCard);
      expect(router.push).toHaveBeenCalledWith('/product/muscle-core-100-whey-platinum-standard-5-lb-chocolate');
    });
  });

  it('shows empty state when no products found', async () => {
    (getProducts as jest.Mock).mockResolvedValue({ 
      success: true,
      data: { products: [] }
    });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <SearchScreen />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('No products found')).toBeTruthy();
    });
  });

  it('handles search input', async () => {
    const { getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <SearchScreen />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const searchInput = getByPlaceholderText('Search products...');
      fireEvent.changeText(searchInput, 'protein');
      expect(getProducts).toHaveBeenCalledWith(expect.objectContaining({
        search: 'protein'
      }));
    });
  });
}); 