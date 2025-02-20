import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme, spacing, borderRadii } from '../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome 
          name="search" 
          size={16} 
          color={theme.colors.textTertiary} 
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Search products..."
          placeholderTextColor={theme.colors.textTertiary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: borderRadii.round,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fonts.regular,
    color: theme.colors.textPrimary,
    padding: 0,
  },
}); 