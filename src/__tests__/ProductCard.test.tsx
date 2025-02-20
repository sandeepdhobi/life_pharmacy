import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '../components/ProductCard';

const mockProduct = {
  id: '1',
  title: 'Test Product',
  slug: 'test-product',
  images: {
    featured_image: 'https://example.com/image.jpg',
    featured_video: null,
    other_images: [],
    gallery_images: [],
  },
  sale: {
    currency: 'AED',
    regular_price: 100,
    offer_price: 80,
    offer_label: '20% OFF',
    offer_type: 'discount',
    vat_text: 'Including VAT',
  },
  rating: '4.5',
  stock: {
    max: 10,
    delivery_icons: [],
  },
  categories: [],
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    const { getByText, getByTestId } = render(
      <ProductCard product={mockProduct} />
    );

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('AED 80.00')).toBeTruthy();
    expect(getByText('20% OFF')).toBeTruthy();
  });

  it('shows original price when there is a discount', () => {
    const { getByText } = render(<ProductCard product={mockProduct} />);
    expect(getByText('AED 100.00')).toBeTruthy();
  });
}); 