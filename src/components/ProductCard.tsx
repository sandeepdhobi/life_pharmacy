import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Product } from '../types/product';
import { theme, borderRadii, spacing } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  if (!product) return null;

  const imageUrl = product.images.featured_image;
  const { regular_price, offer_price, currency, offer_label } = product.sale;
  const displayPrice = offer_price || regular_price;

  return (
    <Link href={`/product/${product.slug}`} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {product.title}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {currency} {displayPrice.toFixed(2)}
            </Text>
            {offer_label && (
              <Text style={styles.offerLabel}>{offer_label}</Text>
            )}
          </View>
          {product.rating && (
            <Text style={styles.rating}>★ {product.rating}</Text>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.card,
    borderRadius: borderRadii.lg,
    marginBottom: spacing.md,
    ...theme.shadows.sm
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH,
    borderTopLeftRadius: borderRadii.lg,
    borderTopRightRadius: borderRadii.lg,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.medium,
    marginBottom: spacing.xs,
    color: theme.colors.textPrimary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.semiBold,
    color: theme.colors.primary,
    marginRight: spacing.sm,
  },
  offerLabel: {
    fontSize: theme.typography.sizes.xs,
    fontFamily: theme.typography.fonts.medium,
    color: theme.colors.error,
  },
  rating: {
    fontSize: 12,
    color: '#FF9500',
    fontWeight: '500',
  },
}); 