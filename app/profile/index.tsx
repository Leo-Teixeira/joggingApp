import { Box } from "@/components/ui/box";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Text, Image, TouchableOpacity, FlatList } from "react-native";

const ProfileHeader = () => {
  return (
    <Box className="bg-primary-violet rounded-b-3xl p-6 mb-4">
      <TouchableOpacity className=" items-end">
        <Text className="text-white text-xl">✎</Text>
      </TouchableOpacity>
      <VStack className="items-center mt-4">
        <Text className="text-white text-lg font-bold mb-4">Profile</Text>
        <Image
          source={require("../../assets/images/avatar.png")}
          className="w-24 h-24 rounded-full mb-3"
        />
        <Text className="text-white text-xl font-bold">Andrew</Text>
        <Text className="text-blue-200 text-sm">Beginner</Text>
      </VStack>
    </Box>
  );
};

const TotalProgress = () => {
  return (
    <Box className="bg-white rounded-xl p-4 mb-4 shadow">
      <HStack className="justify-between">
        <Text className="text-lg font-bold">Total progress</Text>
        <TouchableOpacity>
          <Text className="text-gray-500">›</Text>
        </TouchableOpacity>
      </HStack>
      <HStack className="justify-around mt-4">
        <VStack className="items-center">
          <Text className="text-2xl">🏃‍♂️</Text>
          <Text className="text-lg font-bold">103,2 km</Text>
        </VStack>
        <VStack className="items-center">
          <Text className="text-2xl">⏱</Text>
          <Text className="text-lg font-bold">16,9 hr</Text>
        </VStack>
        <VStack className="items-center">
          <Text className="text-2xl">🔥</Text>
          <Text className="text-lg font-bold">1,5k kcal</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

const MenuList = () => {
  const menuItems = [
    { icon: "👋", label: "Personal parameters" },
    { icon: "🏆", label: "Achievements" },
    { icon: "⚙️", label: "Settings" },
    { icon: "📞", label: "Our contact" }
  ];

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Box className="bg-white rounded-xl p-4 shadow flex flex-col gap-8 mb-4">
          <TouchableOpacity className="flex-row justify-between items-center">
            <HStack className="items-center">
              <Text className="text-2xl mr-3">{item.icon}</Text>
              <Text className="text-lg text-gray-700">{item.label}</Text>
            </HStack>
            <TouchableOpacity className="flex-row justify-between items-center">
              <Image
                source={require("../../assets/images/arrow.png")}
                className="w-4 h-4"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </Box>
      )}
      showsVerticalScrollIndicator={false} // Facultatif
      contentContainerStyle={{ paddingBottom: 20 }} // Ajoute un espace en bas
    />
  );
};

export default function ProfilePage() {
  return (
    <Box className="flex-1 bg-gray-100">
      <ProfileHeader />
      <Box className="p-4">
        <TotalProgress />
        <MenuList />
      </Box>
    </Box>
  );
}
