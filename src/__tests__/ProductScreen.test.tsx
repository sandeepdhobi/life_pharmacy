import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '../context/CartContext';
import ProductScreen from '../app/product/[slug]';
import { getProductDetails } from '../api/client';

// Mock the API client
jest.mock('../api/client', () => ({
  getProductDetails: jest.fn()
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ slug: 'test-product' }),
  router: { push: jest.fn() }
}));

// Mock product details response
const mockProductDetails = {
  product_details: {
    id: '1',
    title: 'Test Product',
    slug: 'test-product',
    brand: {
      name: 'Test Brand',
      images: { logo: 'https://example.com/logo.jpg' }
    },
    images: {
      featured_image: 'https://example.com/image.jpg',
      gallery_images: []
    },
    sale: {
      currency: 'AED',
      regular_price: 100,
      offer_price: 80,
      vat_text: 'Including VAT'
    },
    stock: {
      max: 10,
      delivery_icons: []
    },
    description: 'Test description',
    short_description: 'Short description',
    categories: [],
    ratings: {
      rating: '4.5',
      count: 10
    }
  }
};

describe('ProductScreen', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    (getProductDetails as jest.Mock).mockResolvedValue(mockProductDetails);
  });

  it('renders loading state initially', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductScreen />
        </CartProvider>
      </QueryClientProvider>
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders product details after loading', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductScreen />
        </CartProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
      expect(getByText('Test Brand')).toBeTruthy();
      expect(getByText('AED 80.00')).toBeTruthy();
    });
  });

  it('handles add to cart functionality', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductScreen />
        </CartProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const buyButton = getByText('Buy');
      fireEvent.press(buyButton);
      expect(getByText('Checkout')).toBeTruthy();
    });
  });

  it('shows error state when API fails', async () => {
    (getProductDetails as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductScreen />
        </CartProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('API Error')).toBeTruthy();
    });
  });
}); 