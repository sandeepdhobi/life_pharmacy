import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  ActivityIndicator, 
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductCard } from '../components/ProductCard';
import { getProducts } from '../api/client';
import { Product } from '../types/product';
import { createProductSearch } from '../utils/search';
import { theme, spacing, borderRadii } from '../constants/theme';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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
    if (!searchQuery.trim()) return [];
    
    const search = createProductSearch(allProducts);
    return search(searchQuery).map(result => result.item);
  }, [allProducts, searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Search Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={20} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products..."
            placeholderTextColor={theme.colors.textTertiary}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <FontAwesome name="times-circle" size={16} color={theme.colors.textTertiary} />
            </TouchableOpacity>
          ) : (
            <FontAwesome 
              name="search" 
              size={16} 
              color={theme.colors.textTertiary}
              style={styles.searchIcon}
            />
          )}
        </View>
      </View>

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
            {searchQuery.trim() ? 'No products found' : 'Start typing to search products'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item: Product) => item.id.toString()}
          numColumns={1}
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
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: borderRadii.round,
    paddingHorizontal: spacing.md,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textPrimary,
    height: '100%',
    padding: 0,
  },
  searchIcon: {
    marginLeft: spacing.sm,
  },
  clearButton: {
    padding: spacing.xs,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: spacing.md,
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