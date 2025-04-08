import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={28} color={focused ? 'red' : '#999'} />
          ),
        }}
      />
      <Tabs.Screen
        name="translate"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="translate"
              size={28}
              color={focused ? '#007aff' : '#999'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="camera" size={28} color={focused ? '#ffa500' : '#999'} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo name="menu" size={28} color={focused ? '#3366cc' : '#999'} />
          ),
        }}
      />
    </Tabs>
  );
}
