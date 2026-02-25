import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all 5 of your custom Figma-designed screens
import AuthScreen from './screens/AuthScreen';
import TrackSelectScreen from './screens/TrackSelectScreen';
import RecordScreen from './screens/RecordScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import ScoreScreen from './screens/ScoreScreen';

const Stack = createNativeStackNavigator();

// Apply your exact Figma dark background color globally
const PitchPerfectTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#080812', 
  },
};

export default function App() {
  return (
    <NavigationContainer theme={PitchPerfectTheme}>
      <Stack.Navigator 
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false, // We hide the default header because we built custom ones!
          animation: 'slide_from_right', // Gives that smooth, native swiping feel
        }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="TrackSelect" component={TrackSelectScreen} />
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ animation: 'none' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ animation: 'none' }} />
        
        {/* We use 'fade' for the processing screen so it feels like an overlay loading state */}
        <Stack.Screen 
          name="Processing" 
          component={ProcessingScreen} 
          options={{ animation: 'fade' }} 
        />
        
        <Stack.Screen name="Score" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}