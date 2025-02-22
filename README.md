# Welcome to your LifePharmacy app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Prerequisites

- Node.js >= 18.18
- npm or yarn

## Get started

1. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the app

   ```bash
   yarn run ios
   # or
   yarn run android
   ```

3. Run tests

   ```bash
   # Run all tests
   yarn test --config jest.config.js

   # Run tests in watch mode (recommended during development)
   yarn test:watch

   # Run specific test file
   yarn test --config jest.config.js src/__tests__/SearchScreen.test.tsx

   # Run with coverage report
   yarn test:coverage
   ```

## Build for Release

### Preview Build
```bash
# Create a preview build for testing
yarn build-preview
# or
eas build --platform android --profile preview
```

### Production Release
```bash
# Create production build for Android
yarn build_production_android
# or
eas build --platform android --profile production
```

The builds will be available in your EAS dashboard after completion.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo