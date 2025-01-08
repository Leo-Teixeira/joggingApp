// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "./login";
import TabNavigator from "./tabbar";
import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider mode="system">
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
