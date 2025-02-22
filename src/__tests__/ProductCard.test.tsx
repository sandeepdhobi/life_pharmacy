import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '../components/ProductCard';
import { Link, router } from 'expo-router';

// Mock expo-router
jest.mock('expo-router', () => {
  const router = { push: jest.fn() };
  return {
    Link: ({ children }: any) => children,
    router
  };
});

// Using first product from search.json
const mockProduct = {
  id: "c1068bdd-3254-4a14-81f3-c35b7fa90f1e",
  title: "Muscle Core 100% Whey Platinum Standard 5 Lb Chocolate",
  inventory: {
    sku: "123113"
  },
  images: {
    featured_image: "https://lifeadmin-app.s3.me-south-1.amazonaws.com/EcomApp/products/Ajas/123113-7.jpg",
    featured_video: null,
    other_images: [],
    gallery_images: [{
      image: "https://life-cdn.lifepharmacy.com/images/products/123113-7-1024x1024.jpg",
      thumbnail: "https://life-cdn.lifepharmacy.com/images/products/123113-7-150x150.jpg",
      medium: "https://life-cdn.lifepharmacy.com/images/products/123113-7-300x300.jpg",
      full: "https://life-cdn.lifepharmacy.com/images/products/123113-7-1024x1024.jpg"
    }]
  },
  categories: [{
    id: "b3ce9cec-d4b4-494a-b568-b8eba33b0f3d",
    name: "Whey Protein",
    parent_id: "684ea7e4-b4be-41f9-ac8d-a5077d729672",
    slug: "whey-protein"
  }],
  slug: "muscle-core-100-whey-platinum-standard-5-lb-chocolate",
  pre_order: false,
  type: "otc",
  rating: "4.2",
  stock: {
    max: 5,
    delivery_icons: [{
      until: "5",
      icon: "standard",
      label: "24 hrs"
    }]
  },
  sale: {
    currency: "AED",
    regular_price: 296.1,
    offer_price: 198.45,
    offer_label: "33% OFF",
    offer_type: "flat_discount",
    member_price: 0,
    subscription_price: 0,
    vat_text: "Inclusive of VAT"
  }
};

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    const { getByText } = render(
      <ProductCard product={mockProduct} />
    );

    // Check basic product info
    expect(getByText('Muscle Core 100% Whey Platinum Standard 5 Lb Chocolate')).toBeTruthy();
    expect(getByText('AED 198.45')).toBeTruthy();
    expect(getByText('33% OFF')).toBeTruthy();
    expect(getByText('AED 296.10')).toBeTruthy();

    // Check rating
    expect(getByText('4.2')).toBeTruthy();

    // Check delivery info
    expect(getByText('24 hrs')).toBeTruthy();
  });

  it('navigates to product details on press', () => {
    const { getByRole } = render(
      <ProductCard product={mockProduct} />
    );

    fireEvent.press(getByRole('button'));
    expect(router.push).toHaveBeenCalledWith('/product/muscle-core-100-whey-platinum-standard-5-lb-chocolate');
  });

  it('formats prices correctly', () => {
    const { getByText } = render(
      <ProductCard product={mockProduct} />
    );

    expect(getByText('AED 198.45')).toBeTruthy();
    expect(getByText('AED 296.10')).toBeTruthy();
  });
}); 