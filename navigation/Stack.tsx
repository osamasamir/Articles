import HomeScreen from '../screens/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider ,useSafeAreaFrame} from 'react-native-safe-area-context';
import DetailsScreen from '../screens/DetailsScreen';
import { TouchableOpacity, View,Text } from 'react-native';

const Stack=createStackNavigator<MainParamList>();

export default  function MainStackNavigator() {

    return (
      <SafeAreaProvider  >
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
/>
    
      </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaProvider>
  
    )
  }
  

