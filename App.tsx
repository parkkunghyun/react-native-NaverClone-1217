import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import RouteNames, { RootStackParamList } from './routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowserScreen from './screens/BrowserScreen';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginButton } from './components/LoginButton';
import LoginScreen from './screens/LoginScreen';
import { WebViewProvider } from './components/WebViewProvider';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeIcon = ({ focused, color }: { focused: boolean, color: string }) => {
  if (focused) {
    return <Icon name="home" color={color}  size={26} />;
  }
  return <Icon name="home-outline" color={color} size={26}  />;
};

const ShoppingIcon = ({ focused, color }: { focused: boolean, color: string }) => {
  if (focused) {
    return <Icon name="shopping" color={color}  size={26} />;
  }
  return <Icon name="shopping-outline" color={color} size={26}  />;
};

const HomeTab = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
      backgroundColor: 'black',
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      headerShown: false,
    }}>
      <Tab.Screen options={{ tabBarLabel: '홈', tabBarIcon: HomeIcon}}
        name={RouteNames.HOME} component={HomeScreen} />
      <Tab.Screen options={{tabBarLabel: '쇼핑', tabBarIcon: ShoppingIcon}} name={RouteNames.SHOPPING} component={ShoppingScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <WebViewProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={RouteNames.HOME_TAB} component={HomeTab}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerRight: LoginButton,
            }} />
          <Stack.Screen options={{ headerShown: false }} name={RouteNames.BROWSER} component={BrowserScreen} />
          <Stack.Screen options={{
            title: '',
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }} name={RouteNames.LOGIN} component={LoginScreen} />
        </Stack.Navigator>
        </NavigationContainer>
      </WebViewProvider>
  );
}
