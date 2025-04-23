import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: any;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Translate') {
              iconName = 'language';
            } else if (route.name === 'Camera') {
              iconName = 'camera';
            } else if (route.name === 'Menu') {
              iconName = 'menu';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#f00',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Translate" component={HomeScreen} />
        <Tab.Screen name="Camera" component={HomeScreen} />
        <Tab.Screen name="Menu" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
