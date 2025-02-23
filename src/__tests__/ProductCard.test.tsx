import React from 'react';
import { render } from '@testing-library/react-native';
import { ProductCard } from '../components/ProductCard';

// Mock expo-router
jest.mock('expo-router', () => ({
  Link: ({ children }: any) => children
}));

const mockProduct = {
  id: "c1068bdd-3254-4a14-81f3-c35b7fa90f1e",
  title: "Muscle Core 100% Whey Platinum Standard 5 Lb Chocolate",
  slug: "muscle-core-100-whey-platinum-standard-5-lb-chocolate",
  images: {
    featured_image: "https://example.com/image.jpg"
  },
  sale: {
    currency: "AED",
    regular_price: 296.1,
    offer_price: 198.45,
    offer_label: "33% OFF"
  }
};

describe('ProductCard', () => {
  it('renders product title', () => {
    const { getByText } = render(
      <ProductCard product={mockProduct} />
    );
    expect(getByText('Muscle Core 100% Whey Platinum Standard 5 Lb Chocolate')).toBeTruthy();
  });
}); 