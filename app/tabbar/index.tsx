import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Dashboard from "../home";
import ProfilePage from "../profile";
import MapPage from "../map";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else {
            iconName = focused ? "person" : "person-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray"
      })}>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Map" component={MapPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}
