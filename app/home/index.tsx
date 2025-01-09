import "@/global.css";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
import { Text, Image, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/AppBar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [parkour, setParkour] = useState<Parkour[]>([]);
  const [currentParkour, setCurrentParkour] = useState<Parkour | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const loadParkours = async () => {
        try {
          const recentJogging = await AsyncStorage.getItem("joggingData");
          const currentJoggingData = await AsyncStorage.getItem(
            "currentJogging"
          );

          if (recentJogging) {
            const parsedData = JSON.parse(recentJogging);
            if (Array.isArray(parsedData)) {
              setParkour(parsedData);
            } else {
              console.warn(
                "Invalid data format: expected an array",
                parsedData
              );
              setParkour([]);
            }
          } else {
            setParkour([]);
          }

          if (currentJoggingData) {
            const parsedData = JSON.parse(currentJoggingData);
            const today = new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric"
            });

            const newEntry: Parkour = {
              date: today,
              distance: `${parsedData.distance} km`,
              calories: parsedData.calories,
              speed: `${parsedData.speed} km/hr`,
              time: `${parsedData.time} min`
            };

            setCurrentParkour(newEntry);
          }
        } catch (error) {
          console.error("Error loading parkours from AsyncStorage:", error);
          setParkour([]);
        }
      };

      loadParkours();
    }, [])
  );

  useEffect(() => {
    AsyncStorage.removeItem("currentJogging");
  }, []);

  return (
    <Box className="flex-1 bg-gray-100">
      <Header />
      <Box className="flex-1 p-4">
        {currentParkour && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Map");
            }}>
            <Box className="bg-primary-violet rounded-full p-4 mb-4 shadow">
              <HStack className="justify-between">
                <HStack className="items-center">
                  <Text className="text-4xl mr-3">🏃‍♂️</Text>
                  <VStack>
                    <Text className="text-white text-lg font-bold">
                      Current jogging
                    </Text>
                    <Text className="text-gray-200 text-sm">
                      {currentParkour.date}
                    </Text>
                  </VStack>
                </HStack>
                <VStack className="justify-end items-end">
                  <Text className="text-white text-lg font-bold">
                    {currentParkour.time}
                  </Text>
                  <HStack className="items-center justify-center gap-2">
                    <Text className="text-white text-sm">
                      {currentParkour.distance}
                    </Text>
                    <Text className="text-gray-200 text-sm">
                      {currentParkour.calories} kcal
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          </TouchableOpacity>
        )}

        <Box className="flex-1">
          <Box className="flex flex-row justify-between mb-4">
            <Text className="text-lg font-bold">Recent activity</Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/parkour");
              }}>
              <Text className="text-primary-violet text-lg font-bold">All</Text>
            </TouchableOpacity>
          </Box>
          {parkour.length > 0 ? (
            <FlatList
              data={parkour}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <Box className="bg-white rounded-xl p-4 shadow flex flex-col gap-8 mb-4">
                  <HStack className="justify-between items-center">
                    <Box className="flex flex-row justify-between">
                      <HStack>
                        <Image
                          source={require("../../assets/images/map.jpeg")}
                          className="w-16 h-16 rounded mr-3"
                        />
                        <VStack>
                          <Text className="text-gray-700 text-sm">
                            {item.date}
                          </Text>
                          <Text className="text-lg font-bold">
                            {item.distance}
                          </Text>
                          <Text className="text-gray-500 text-sm">{`${item.calories} kcal  ${item.speed}`}</Text>
                        </VStack>
                        <Text className="text-lg font-bold">{item.time}</Text>
                      </HStack>
                    </Box>
                    <TouchableOpacity className="flex-row justify-between items-center mb-4">
                      <Image
                        source={require("../../assets/images/arrow.png")}
                        className="w-4 h-4"
                      />
                    </TouchableOpacity>
                  </HStack>
                </Box>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <Text className="text-gray-500 text-center">
              No recent activity
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
