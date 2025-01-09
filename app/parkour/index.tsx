import React, { useState, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const ParkourListPage: React.FC = () => {
  const [parkours, setParkours] = useState<Parkour[]>([]);
  const router = useRouter();

  const loadParkours = async () => {
    try {
      const storedData = await AsyncStorage.getItem("joggingData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData)) {
          setParkours(parsedData);
        } else {
          console.warn("Invalid data format: expected an array", parsedData);
          setParkours([]);
        }
      } else {
        setParkours([]);
      }
    } catch (error) {
      console.error("Error loading parkours from AsyncStorage:", error);
    }
  };

  const deleteParkour = async (index: number) => {
    Alert.alert(
      "Delete Parkour",
      "Are you sure you want to delete this parkour?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedParkours = parkours.filter((_, i) => i !== index);
              setParkours(updatedParkours);
              await AsyncStorage.setItem(
                "joggingData",
                JSON.stringify(updatedParkours)
              );
            } catch (error) {
              console.error("Error deleting parkour from AsyncStorage:", error);
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    loadParkours();
  }, []);

  return (
    <Box className="flex-1 bg-gray-100 p-4 gap-8">
      <HStack className="items-center gap-32">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">All Parkours</Text>
      </HStack>
      {parkours.length > 0 ? (
        <FlatList
          data={parkours}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Box className="bg-white rounded-xl p-4 shadow flex flex-col gap-8 mb-4">
              <HStack className="justify-between items-center">
                <Box className="flex flex-row justify-between">
                  <HStack>
                    <Image
                      source={require("../../assets/images/map.jpeg")}
                      className="w-16 h-16 rounded mr-3"
                    />
                    <VStack>
                      <Text className="text-gray-700 text-sm">{item.date}</Text>
                      <Text className="text-lg font-bold">{item.distance}</Text>
                      <Text className="text-gray-500 text-sm">{`${item.calories} kcal  ${item.speed}`}</Text>
                    </VStack>
                  </HStack>
                </Box>
                <TouchableOpacity
                  onPress={() => deleteParkour(index)}
                  className="rounded-full p-2">
                  <Icon name="trash" size={24} color="red" />
                </TouchableOpacity>
              </HStack>
            </Box>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text className="text-gray-500 text-center">No parkours found</Text>
      )}
    </Box>
  );
};

export default ParkourListPage;
