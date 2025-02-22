import { StyleSheet, Dimensions } from 'react-native';
import { theme, spacing, borderRadii } from '../../constants/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
    backgroundColor: theme.colors.lightGray,
    borderRadius: borderRadii.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  reviewerPhoto: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  reviewerName: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fonts.medium,
    color: theme.colors.textSecondary,
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
  checkoutButton: {
    backgroundColor: theme.colors.success,
  },
  defaultPhotoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 