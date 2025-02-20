interface BaseSale {
  currency: string;
  regular_price: number;
  offer_price: number;
  offer_label: string | null;
  offer_type: string | null;
  vat_text: string;
}

interface ProductSale extends BaseSale {
  member_price: number;
  subscription_price: number;
}

interface ProductDetailsSale extends BaseSale {}

export interface Product {
  id: string;
  title: string;
  slug: string;
  images: {
    featured_image: string;
    featured_video: string | null;
    other_images: string[];
    gallery_images: {
      image: string;
      thumbnail: string;
      medium: string;
      full: string;
    }[];
  };
  sale: ProductSale;
  rating: string;
  stock: {
    max: number;
    delivery_icons: {
      until: string;
      icon: string;
      label: string;
    }[];
  };
  categories: {
    id: string;
    name: string;
    parent_id: string;
    slug: string;
  }[];
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
  };
}

export interface ProductDetails {
  id: string;
  title: string;
  slug: string;
  brand: {
    id: string;
    name: string;
    images: {
      logo: string;
      banner: string;
    };
    slug: string;
  };
  description: string;
  short_description: string;
  images: Product['images'];
  sale: ProductDetailsSale;
  categories: {
    id: string;
    name: string;
    parent_id?: string;
    slug: string;
  }[];
  label: {
    label_text: string;
    icon_type: string;
    color_code: string;
    active: boolean;
    sub_label_text: string | null;
  };
  rating: string;
  stock: {
    max: number;
    delivery_icons: {
      until: string;
      icon: string;
      label: string;
    }[];
  };
  reviews: {
    _id: string;
    value: number;
    user_id: number;
    review: string | null;
    is_anonymous: boolean;
    created_at: string;
    user_details: {
      name: string;
      photo: string;
    };
  }[];
  ratings: {
    rating: string;
    count: number;
    breakdown: {
      [key: string]: number;
    };
  };
}

export interface ProductDetailsResponse {
  success: boolean;
  message: string;
  data: {
    product_details: ProductDetails;
    reviews: ProductDetails['reviews'];
    ratings: ProductDetails['ratings'];
    related_products: Product[];
  };
} 