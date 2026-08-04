import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        tabBarStyle: {
        backgroundColor: "#1a1a1a",
        borderTopWidth: 0,
      }
      }}
      
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mapa',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="pokemon-go" color={color} style={{ marginBottom: -3 }} />,
        }}
      />
      <Tabs.Screen
        name="pokedex"
        options={{
          title: 'Pokédex',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="catching-pokemon" color={color} size={28} style={{ marginBottom: -3 }} />,
        }}
      />
    </Tabs>
  );
}
