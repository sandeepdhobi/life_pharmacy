// Move all content from src/app/product/[slug].tsx here
// Keep the same code, just rename the component to ProductScreen
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  Image, 
  ActivityIndicator, 
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Pressable
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getProductDetails } from '../../api/client';
import HTML from 'react-native-render-html';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { theme, spacing, borderRadii } from '../../constants/theme';

const { width } = Dimensions.get('window');

const BENEFITS = [
  {
    icon: 'dollar',
    title: 'Value for Money',
    description: 'Competitive prices on a vast range of products'
  },
  {
    icon: 'globe',
    title: 'Shop Globally',
    description: 'Serving over 300 million shoppers across more than 200 countries'
  },
  {
    icon: 'shield',
    title: 'Enhanced Protection',
    description: 'Trusted payment options loved by worldwide shoppers'
  },
  {
    icon: 'user',
    title: 'Customer Assurance',
    description: 'Trusted payment options loved by worldwide shoppers.'
  },
  {
    icon: 'mobile',
    title: 'Life Pharmacy App',
    description: 'Shop on the go, anytime, anywhere'
  }
];

export default function ProductDetailsScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { dispatch } = useCart();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductDetails(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !data?.product_details) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>
          {error ? (error as Error).message : 'Product not found'}
        </Text>
      </View>
    );
  }

  const product = data.product_details;
  const { regular_price, offer_price, currency, offer_label, vat_text } = product.sale;
  const displayPrice = offer_price || regular_price;
  const discount = regular_price > offer_price 
    ? Math.round((1 - offer_price / regular_price) * 100)
    : 0;

  const allImages = [
    product.images.featured_image,
    ...product.images.gallery_images.map(img => img.full)
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(newIndex);
            }}
          >
            {allImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.galleryImage}
                resizeMode="contain"
              />
            ))}
          </ScrollView>
        

          {/* Labels */}
          <View style={styles.labelsContainer}>
            {product.label && product.label.active && (
              <View 
                style={[
                  styles.labelBadge,
                  { backgroundColor: product.label.color_code || theme.colors.primary }
                ]}
              >
                <Text style={styles.labelText}>{product.label.label_text}</Text>
                {product.label.sub_label_text && (
                  <Text style={styles.subLabelText}>{product.label.sub_label_text}</Text>
                )}
              </View>
            )}
          </View>
        </View>

        {/* Product Header Section */}
        <View style={styles.productHeaderSection}>
          {/* Brand */}
          {product.brand && (
            <View style={styles.brandRow}>
              <Image 
                source={{ uri: product.brand.images.logo }} 
                style={styles.brandLogo}
                resizeMode="contain"
              />
              <View style={styles.brandInfo}>
                <Text style={styles.brandName}>{product.brand.name}</Text>
                <Pressable onPress={() => router.push('/')}>
                  <Text style={styles.viewBrand}>View all products</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Title */}
          <Text style={styles.title}>{product.title}</Text>

          {/* Rating */}
          {product.ratings && (
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingScore}>{product.ratings.rating}</Text>
              <Text style={styles.ratingCount}>
                ({product.ratings.count} reviews)
              </Text>
            </View>
          )}

<View style={styles.stockHeader}>
                <FontAwesome 
                  name={product.stock.max > 0 ? "check-circle" : "times-circle"} 
                  size={18} 
                  color={product.stock.max > 0 ? theme.colors.success : theme.colors.error}
                />
                <Text style={[
                  styles.stockText,
                  { color: product.stock.max > 0 ? theme.colors.success : theme.colors.error }
                ]}>
                  {product.stock.max > 0 
                    ? `In Stock (${product.stock.max} available)` 
                    : 'Out of Stock'}
                </Text>
              </View>

          {/* Categories */}
          {product.categories.length > 0 && (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
            >
              {product.categories.map(category => (
                <Pressable 
                  key={category.id}
                  style={styles.categoryChip}
                  onPress={() => router.push(`/`)}
                >
                  <Text style={styles.categoryText}>{category.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          {!showFullDescription && <Text style={styles.sectionTitle}>Description</Text>}
          <HTML 
            source={{ 
              html: showFullDescription 
                ? product.description 
                : product.short_description 
            }} 
            contentWidth={width - spacing.md * 2}
            baseStyle={styles.descriptionText}
          />
          {product.description && (
            <Pressable
              style={styles.readMoreButton}
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={styles.readMoreText}>
                {showFullDescription ? 'Show Less' : 'Read More'}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Reviews */}
        <View style={styles.reviewsSection}>
          {product.reviews && product.reviews.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              {product.reviews.slice(0, 2).map(review => (
                <View key={review._id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Image 
                      source={{ uri: review.user_details.photo }}
                      style={styles.reviewerPhoto}
                    />
                    <View>
                      <Text style={styles.reviewerName}>
                        {review.is_anonymous ? 'Anonymous' : review.user_details.name}
                      </Text>
                      <View style={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                          <FontAwesome
                            key={i}
                            name="star"
                            size={12}
                            color={i < review.value ? "#FFD700" : theme.colors.textDisabled}
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={styles.reviewDate}>
                      {new Date(review.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  {review.review && (
                    <Text style={styles.reviewText}>{review.review}</Text>
                  )}
                </View>
              ))}
              {product.reviews.length > 2 && (
                <Pressable 
                  style={styles.viewAllButton}
                  onPress={() => {/* Navigate to all reviews */}}
                >
                  <Text style={styles.viewAllText}>
                    View all {product.reviews.length} reviews
                  </Text>
                  <FontAwesome 
                    name="chevron-right" 
                    size={14} 
                    color={theme.colors.primary}
                  />
                </Pressable>
              )}
            </>
          )}
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>
            Shop Products, Save with Life Pharmacy
          </Text>
          {BENEFITS.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.benefitIconContainer}>
                <FontAwesome 
                  name={benefit.icon} 
                  size={20} 
                  color={theme.colors.secondary} 
                />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>
                  {benefit.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarContent}>
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>
                {currency} {displayPrice.toFixed(2)}
              </Text>
              {regular_price > offer_price && (
                <Text style={styles.originalPrice}>
                  {currency} {regular_price.toFixed(2)}
                </Text>
              )}
            </View>
            <View style={styles.taxRow}>
              <Text style={styles.vatText}>Tax and Duty included</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{discount}%</Text>
              </View>
            </View>
            {/* Delivery Icons */}
            {product.stock.delivery_icons.map((icon, index) => (
              <View key={index} style={styles.deliveryRow}>
                  <Text style={styles.deliveryText}>Delivery in {icon.label}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity 
            style={styles.buyButton}
            onPress={() => {
              if (product.stock.max > 0) {
                dispatch({ 
                  type: 'ADD_TO_CART', 
                  payload: {
                    ...product,
                    sale: {
                      ...product.sale,
                      member_price: 0,
                      subscription_price: 0
                    }
                  } 
                });
              }
            }}
          >
            <FontAwesome 
              name="shopping-cart" 
              size={20} 
              color={theme.colors.background}
              style={styles.cartIcon} 
            />
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  imageGallery: {
    width: width,
    height: width,
    backgroundColor: theme.colors.background,
    marginBottom: 2,
  },
  galleryImage: {
    width: width,
    height: width,
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: spacing.md,
    width: '100%',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: borderRadii.round,
    backgroundColor: theme.colors.overlay,
    marginHorizontal: spacing.xs,
  },
  activeIndicator: {
    backgroundColor: theme.colors.textPrimary,
  },
  labelBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadii.sm,
  },
  labelText: {
    color: theme.colors.background,
    fontSize: theme.typography.sizes.xs,
    fontFamily: theme.typography.fonts.medium,
  },
  subLabelText: {
    color: theme.colors.background,
    fontSize: theme.typography.sizes.xs,
    fontFamily: theme.typography.fonts.regular,
  },
  contentContainer: {
    flex: 1,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  brandLogo: {
    width: 40,
    height: 40,
    marginRight: spacing.md,
    borderRadius: borderRadii.sm,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.semiBold,
    color: theme.colors.textTertiary,
  },
  viewBrand: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.primary,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fonts.semiBold,
    color: theme.colors.textSecondary,
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    marginTop: spacing.sm,
  },
  categoryChip: {
    backgroundColor: theme.colors.secondaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadii.round,
    marginRight: spacing.sm,
  },
  categoryText: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.medium,
    color: theme.colors.background,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingScore: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.semiBold,
    marginLeft: spacing.xs,
  },
  ratingCount: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
    marginLeft: spacing.sm,
  },
  ratingArrow: {
    marginLeft: 'auto',
  },
  priceSection: {
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  currentPrice: {
    fontSize: 24,
    fontFamily: theme.typography.fonts.semiBold,
    color: theme.colors.textSecondary,
    marginRight: spacing.sm,
  },
  originalPrice: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textTertiary,
    textDecorationLine: 'line-through',
    marginRight: spacing.sm,
  },
  taxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  vatText: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textTertiary,
    marginRight: spacing.sm,
  },
  stockInfo: {
    padding: spacing.md,
  },
  stockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stockText: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.medium,
    marginLeft: spacing.sm,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  deliveryIcon: {
    width: 20,
    height: 20,
    marginRight: spacing.sm,
  },
  deliveryLabel: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.medium,
    color: theme.colors.textPrimary,
  },
  deliveryTime: {
    fontSize: theme.typography.sizes.xs,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
  },
  description: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fonts.medium,
    marginBottom: spacing.md,
    color: theme.colors.textSecondary,
  },
  descriptionText: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeights.md,
  },
  readMoreButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
  },
  readMoreText: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.medium,
    color: theme.colors.primary,
  },
  reviewsSection: {
    backgroundColor: theme.colors.background,
    padding: spacing.md,
    marginBottom: 1,
  },
  reviewItem: {
    padding: spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: borderRadii.md,
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  reviewerPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  reviewerName: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.medium,
  },
  reviewRating: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  reviewDate: {
    marginLeft: 'auto',
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textTertiary,
  },
  reviewText: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeights.md,
  },
  bottomBar: {
    padding: spacing.md,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBarPrice: {
    fontSize: theme.typography.sizes.xl,
    fontFamily: theme.typography.fonts.semiBold,
    color: theme.colors.textPrimary,
  },
  discountLabel: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.medium,
    color: theme.colors.error,
    marginLeft: spacing.sm,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  viewAllText: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.medium,
    color: theme.colors.primary,
    marginRight: spacing.sm,
  },
  productHeaderSection: {
    backgroundColor: theme.colors.background,
    padding: spacing.md,
    marginBottom: 1,
  },
  stockDeliverySection: {
    padding: spacing.md,
    marginBottom: 1,
    backgroundColor: theme.colors.background,
  },
  descriptionSection: {
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  priceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  benefitsSection: {
    backgroundColor: theme.colors.background,
    padding: spacing.md,
    marginBottom: 10,
    margin: spacing.md,
    borderRadius: borderRadii.md,
    ...theme.shadows.sm
  },
  benefitsTitle: {
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fonts.semiBold,
    color: theme.colors.textTertiary,
    marginBottom: spacing.lg,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  benefitIconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadii.round,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.semiBold,
    color: theme.colors.textTertiary,
    marginBottom: spacing.xs,
  },
  benefitDescription: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeights.md,
  },
  deliveryInfo: {
    marginBottom: spacing.md,
  },
  fromText: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.medium,
  },
  deliveryText: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textSecondary,
  },
  buyButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadii.md,
  },
  cartIcon: {
    marginRight: spacing.sm,
  },
  buyButtonText: {
    color: theme.colors.background,
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fonts.semiBold,
  },
  labelsContainer: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    alignItems: 'flex-end',
  },
  discountBadge: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadii.sm,
    alignSelf: 'flex-start',
  },
  discountText: {
    color: theme.colors.background,
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.medium,
  },
}); 