import { Box } from "@/components/ui/box";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
import { Text, Image, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TotalProgressProps {
  totalDistance: number | string;
  totalTime: number | string;
  totalCalories: number | string;
}

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

const TotalProgress: React.FC<TotalProgressProps> = ({
  totalDistance,
  totalTime,
  totalCalories
}) => {
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
          <Text className="text-lg font-bold">{totalDistance} km</Text>
        </VStack>
        <VStack className="items-center">
          <Icon name="time-outline" size={30} color="black" />
          <Text className="text-lg font-bold">{totalTime} hr</Text>
        </VStack>
        <VStack className="items-center">
          <Icon name="flame-outline" size={30} color="black" />
          <Text className="text-lg font-bold">{totalCalories} kcal</Text>
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
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const loadParkours = async () => {
    try {
      const recentJogging = await AsyncStorage.getItem("joggingData");

      if (recentJogging) {
        const parsedData = JSON.parse(recentJogging);
        if (Array.isArray(parsedData)) {
          const totalDist = parsedData.reduce(
            (sum, p) => sum + parseFloat(p.distance),
            0
          );
          const totalT = parsedData.reduce(
            (sum, p) => sum + parseFloat(p.time) / 60,
            0
          );
          const totalCal = parsedData.reduce(
            (sum, p) => sum + parseFloat(p.calories),
            0
          );

          setTotalDistance(totalDist.toFixed(2));
          setTotalTime(totalT.toFixed(1));
          setTotalCalories(totalCal.toFixed(0));
        } else {
          console.warn("Invalid data format: expected an array", parsedData);
        }
      } else {
      }
    } catch (error) {
      console.error("Error loading parkours from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadParkours();
  }, []);

  return (
    <Box className="flex-1 bg-gray-100">
      <ProfileHeader />
      <Box className="p-4">
        <TotalProgress
          totalDistance={totalDistance}
          totalTime={totalTime}
          totalCalories={totalCalories}
        />
        <MenuList />
      </Box>
    </Box>
  );
}
