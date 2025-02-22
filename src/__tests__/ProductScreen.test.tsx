import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '../context/CartContext';
import ProductScreen from '../app/product/[slug]';
import { getProductDetails } from '../api/client';

jest.mock('../api/client');
jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ 
    slug: 'muscle-core-100-whey-platinum-standard-5-lb-chocolate' 
  }),
  router: { push: jest.fn() }
}));
jest.mock('@expo/vector-icons', () => ({
  FontAwesome: () => 'Icon'
}));
jest.mock('react-native-render-html', () => 'HTML');
jest.mock('react-native-confetti-cannon', () => 'ConfettiCannon');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

// Using data structure from product.json
const mockProductResponse = {
  success: true,
  message: "Product details fetched successfully",
  data: {
    product_details: {
      id: "c1068bdd-3254-4a14-81f3-c35b7fa90f1e",
      title: "Muscle Core 100% Whey Platinum Standard 5 Lb Chocolate",
      inventory: {
        sku: "123113"
      },
      brand: {
        id: "4be09274-5e40-4bc6-9ce8-48c3d74a715a",
        name: "MUSCLE CORE",
        images: {
          logo: "https://life-cdn.lifepharmacy.com/brand-logos/muscle-core.png",
          banner: "https://lifeadmin-app.s3.me-south-1.amazonaws.com/EcomApp/products/Brand-banners/MUSCLE-CORE.jpg"
        },
        slug: "muscle-core"
      },
      description: "<p>CAREFULLY FORMULATED PROTEIN BLEND FOR MAXIMUM RESULTS</p>",
      short_description: "<p>CAREFULLY FORMULATED WHEY PROTEIN BLEND FOR MAXIMUM RESULTS</p>",
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
      sale: {
        currency: "AED",
        regular_price: 296.1,
        offer_price: 198.45,
        offer_label: "33% OFF",
        offer_type: "flat_discount",
        member_price: 0,
        subscription_price: 0,
        vat_text: "Inclusive of VAT"
      },
      stock: {
        max: 5,
        delivery_icons: [{
          until: "5",
          icon: "standard",
          label: "24 hrs"
        }]
      }
    },
    reviews: [{
      _id: "67ad7a1adeaf7c1c2c073ed7",
      value: 5,
      user_id: 751770,
      review: null,
      is_anonymous: false,
      created_at: "2025-02-13T04:50:34.879000Z",
      user_details: {
        name: "Sara FardinFard",
        photo: ""
      }
    }]
  }
};

describe('ProductScreen', () => {
  beforeEach(() => {
    (getProductDetails as jest.Mock).mockResolvedValue(mockProductResponse);
  });

  it('shows loading indicator initially', () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductScreen />
        </CartProvider>
      </QueryClientProvider>
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays product details correctly', async () => {
    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductScreen />
        </CartProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      // Title and price
      expect(getByText('Muscle Core 100% Whey Platinum Standard 5 Lb Chocolate')).toBeTruthy();
      expect(getByText('AED 198.45')).toBeTruthy();
      expect(getByText('33% OFF')).toBeTruthy();
      expect(getByText('AED 296.10')).toBeTruthy();

      // Brand info
      expect(getByText('MUSCLE CORE')).toBeTruthy();

      // Description
      expect(getByText('CAREFULLY FORMULATED PROTEIN BLEND FOR MAXIMUM RESULTS')).toBeTruthy();
    });
  });

  it('handles add to cart and shows confetti', async () => {
    const { getByText, queryByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductScreen />
        </CartProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const buyButton = getByText('Buy');
      expect(buyButton).toBeTruthy();
      fireEvent.press(buyButton);
    });

    await waitFor(() => {
      expect(getByText('Checkout')).toBeTruthy();
      expect(queryByTestId('confetti-cannon')).toBeTruthy();
    });
  });

  it('shows error message when API fails', async () => {
    (getProductDetails as jest.Mock).mockRejectedValue(new Error('Failed to fetch product'));

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductScreen />
        </CartProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('Failed to fetch product')).toBeTruthy();
    });
  });

  it('toggles description length', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductScreen />
        </CartProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const readMoreButton = getByText('Read More');
      fireEvent.press(readMoreButton);
      expect(getByText('Show Less')).toBeTruthy();
    });
  });
}); 