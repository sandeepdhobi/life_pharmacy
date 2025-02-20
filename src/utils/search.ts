import Fuse from 'fuse.js';
import { Product } from '../types/product';

const fuseOptions = {
  keys: ['title', 'brand.name', 'categories.name'],
  threshold: 0.3,
  includeScore: true,
};

export const createProductSearch = (products: Product[]) => {
  const fuse = new Fuse(products, fuseOptions);
  return (query: string) => fuse.search(query);
}; 