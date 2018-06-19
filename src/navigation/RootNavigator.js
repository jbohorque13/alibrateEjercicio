import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AppTabNavigation } from './AppTabNavigation';

export default createStackNavigator(
  {
    AppTabNavigation,
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);
