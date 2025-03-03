// Move all content from src/app/cart.tsx here
// Keep the same code, just rename the component to CartScreen
import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import { useCart } from '../../context/CartContext';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { styles } from './styles';

export default function CartScreen() {
  const { state, dispatch } = useCart();

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={state.items}
        keyExtractor={item => item.product.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image
              source={{ uri: item.product.images.featured_image }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.product.title}
              </Text>
              <Text style={styles.itemPrice}>
                {item.product.sale.currency} {item.product.sale.offer_price.toFixed(2)}
              </Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                  style={styles.quantityButton}
                >
                  <FontAwesome name="minus" size={16} color={theme.colors.background} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                  style={styles.quantityButton}
                >
                  <FontAwesome name="plus" size={16} color={theme.colors.background} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyCart}>
            <FontAwesome name="shopping-cart" size={48} color="#999" />
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
} 