import React, { useState } from "react";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (email && password) {
      router.push("/home");
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <Box className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-xl font-bold mb-6">Login</Text>
      <TextInput
        className="w-4/5 h-12 border border-gray-400 mb-4 px-3 rounded"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-4/5 h-12 border border-gray-400 mb-6 px-3 rounded"
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button className="bg-blue-500 py-3 px-6 rounded" onPress={handleLogin}>
        <Text className="text-white font-bold">Login</Text>
      </Button>
    </Box>
  );
};

export default LoginScreen;
