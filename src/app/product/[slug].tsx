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
import ConfettiCannon from 'react-native-confetti-cannon';
import { styles } from './styles';

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
  const { state, dispatch } = useCart();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductDetails(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator testID="loading-indicator" size="large" color={theme.colors.primary} />
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

  // Check if product is in cart
  const isInCart = state.items.some(item => item.product.id === product.id);

  const handleBuyPress = () => {
    if (!isInCart) {
      dispatch({ 
        type: 'ADD_TO_CART', 
        payload: {
          id: product.id,
          title: product.title,
          images: product.images,
          sale: {
            ...product.sale,
            member_price: 0,
            subscription_price: 0
          },
          quantity: 1
        }
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      router.push('/Cart');
    }
  };

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
          {data.reviews && data.reviews.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              {data.reviews.slice(0, 5).map(review => (
                <View key={review._id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    {review.user_details.photo ? (
                      <Image 
                        source={{ uri: review.user_details.photo }}
                        style={styles.reviewerPhoto}
                      />
                    ) : (
                      <View style={[styles.reviewerPhoto, styles.defaultPhotoContainer]}>
                        <FontAwesome 
                          name="user-circle" 
                          size={30} 
                          color={theme.colors.borderLight} 
                        />
                      </View>
                    )}
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

      {showConfetti && (
        <ConfettiCannon
          count={100}
          origin={{x: width/2, y: Dimensions.get('window').height - 100}}
          autoStart={true}
          fadeOut={false}
        />
      )}
      
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
            style={[
              styles.buyButton
            ]} 
            onPress={handleBuyPress}
          >
            <FontAwesome 
              name="shopping-cart" 
              size={20} 
              color={theme.colors.background}
              style={styles.cartIcon} 
            />
            <Text style={styles.buyButtonText}>
              {isInCart ? 'Checkout' : 'Buy'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
