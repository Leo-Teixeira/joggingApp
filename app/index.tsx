// App.tsx
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TabNavigator from "./tabbar";
import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function App() {
  return (
    <GluestackUIProvider mode="system">
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <TabNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
