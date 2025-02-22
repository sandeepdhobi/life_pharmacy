import { StyleSheet } from 'react-native';
import { theme, spacing } from '../../constants/theme';

export const styles = StyleSheet.create({
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