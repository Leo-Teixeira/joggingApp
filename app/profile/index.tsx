import { Box } from "@/components/ui/box";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Text, Image, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileHeader = () => {
  return (
    <Box className="bg-primary-violet rounded-b-3xl p-6 mb-4">
      <TouchableOpacity className=" items-end">
        <Icon name="create-outline" size={24} color="white" />
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
          <Icon name="chevron-forward-outline" size={24} color="gray" />
        </TouchableOpacity>
      </HStack>
      <HStack className="justify-around mt-4">
        <VStack className="items-center">
          <Icon name="walk-outline" size={30} color="black" />
          <Text className="text-lg font-bold">103,2 km</Text>
        </VStack>
        <VStack className="items-center">
          <Icon name="time-outline" size={30} color="black" />
          <Text className="text-lg font-bold">16,9 hr</Text>
        </VStack>
        <VStack className="items-center">
          <Icon name="flame-outline" size={30} color="black" />
          <Text className="text-lg font-bold">1,5k kcal</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

const MenuList = () => {
  const menuItems = [
    { icon: "person-outline", label: "Personal parameters" },
    { icon: "trophy-outline", label: "Achievements" },
    { icon: "settings-outline", label: "Settings" },
    { icon: "call-outline", label: "Our contact" }
  ];

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Box className="bg-white rounded-xl p-4 shadow flex flex-col gap-8 mb-4">
          <TouchableOpacity className="flex-row justify-between items-center">
            <HStack className="items-center">
              <Icon
                name={item.icon}
                size={24}
                color="gray"
                style={{ marginRight: 12 }}
              />
              <Text className="text-lg text-gray-700">{item.label}</Text>
            </HStack>
            <TouchableOpacity>
              <Icon name="chevron-forward-outline" size={24} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
        </Box>
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
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
