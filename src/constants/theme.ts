import { Appearance } from 'react-native';

const systemColorTheme = Appearance.getColorScheme() ?? 'light';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const typography = {
  fonts: {
    light: 'Onest-Light',
    regular: 'Onest-Regular',
    medium: 'Onest-Medium',
    semiBold: 'Onest-SemiBold',
    bold: 'Onest-Bold',
  },
  sizes: {
    xxs: 11,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeights: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
};

export const borderRadii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

const baseTheme = {
  spacing,
  typography,
  borderRadii,
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#0086C9',
    primaryLight: '#47A1FF',
    primaryDark: '#0055B3',
    secondary: '#F4B345',
    secondaryLight: '#F7C674',
    secondaryDark: '#703725',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    card: '#FFFFFF',
    card2: '#F2F2F7',
    textPrimary: '#000000',
    textSecondary: '#3C3C43',
    textTertiary: '#667085',
    textDisabled: '#C5C5C7',
    border: '#0086C9',
    borderLight: '#43a9ec',
    skeleton: '#E5E5EA',
    skeletonContrast: '#E5E5EA',
    overlay: 'rgba(0, 0, 0, 0.4)',
    lightGray: '#FAFAFA',
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1.5 },
      shadowOpacity: 0.23,
      shadowRadius: 2,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    primary: '#0086C9',
    primaryLight: '#5E5CE6',
    primaryDark: '#0055B3',
    secondary: '#F4B345',
    secondaryLight: '#F7C674',
    secondaryDark: '#703725',
    success: '#32D74B',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#5E5CE6',
    background: '#101010',
    surface: '#1C1C1E',
    card: '#2C2C2E',
    card2: '#2C2C2E',
    textPrimary: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#EBEBF599',
    textDisabled: '#3A3A3C',
    border: '#0086C9',
    borderLight: '#43a9ec',
    skeleton: '#545456',
    skeletonContrast: '#6a6a6e',
    overlay: 'rgba(0, 0, 0, 0.6)',
    lightGray: '#FAFAFA',
  },
  shadows: {
    sm: {
      shadowColor: '#EBEBF5',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#EBEBF5',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 4.65,
      elevation: 3,
    },
    lg: {
      shadowColor: '#EBEBF5',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.4,
      shadowRadius: 6.27,
      elevation: 4,
    },
  },
};

export const theme = systemColorTheme === 'dark' ? darkTheme : lightTheme;

// Type definitions
export type Theme = typeof lightTheme;
export type ThemeColors = keyof Theme['colors']; 