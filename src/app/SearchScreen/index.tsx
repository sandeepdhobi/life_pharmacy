// Move all content from src/app/index.tsx here
// Keep the same code, just rename the component to SearchScreen
import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  ActivityIndicator, 
  Text,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductCard } from '../../components/ProductCard';
import { getProducts } from '../../api/client';
import { Product } from '../../types/product';
import { createProductSearch } from '../../utils/search';
import { theme, spacing } from '../../constants/theme';
import { SearchBar } from '../../components/SearchBar';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasMore) {
        return pages.length;
      }
      return undefined;
    },
  });

  const allProducts = useMemo(() => 
    data?.pages.flatMap(page => page.data) ?? [], 
    [data]
  );

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return allProducts;
    
    const search = createProductSearch(allProducts);
    return search(searchQuery).map(result => result.item);
  }, [allProducts, searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <SearchBar 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {status === 'pending' ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : status === 'error' ? (
        <View style={styles.centered}>
          <Text style={styles.error}>
            {error ? (error as Error).message : 'Something went wrong'}
          </Text>
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            {searchQuery ? 'No products found' : 'No products available'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item: Product) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage && !searchQuery) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={styles.loader} color={theme.colors.primary} />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: spacing.md,
  },
  row: {
    justifyContent: 'space-between',
  },
  loader: {
    marginVertical: spacing.md,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.medium,
  },
  emptyText: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
  },
}); 