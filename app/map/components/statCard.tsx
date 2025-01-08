import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

const StatsCard = ({
  time,
  distance,
  calories,
  speed,
  isRunning,
  onStop,
  onResume,
  onPause
}) => {
  return (
    <View className="absolute bottom-12 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
      {/* Temps de course */}
      <View className="flex-row justify-between items-center mb-4">
        <VStack>
          <Text className="text-gray-500 text-sm">Running time</Text>
          <Text className="text-black text-2xl font-bold">{time}</Text>
        </VStack>
        <HStack className="gap-4">
          {!isRunning && (
            <TouchableOpacity
              className={`w-12 h-12 flex justify-center items-center rounded-full ${"bg-red-600"}`}
              onPress={onStop}>
              <Ionicons name={"stop"} size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            className={`w-12 h-12 flex justify-center items-center rounded-full ${"bg-primary-violet"}`}
            onPress={isRunning ? onPause : onResume}>
            <Ionicons
              name={isRunning ? "pause" : "play"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </HStack>
      </View>

      <View className="flex-row justify-between ">
        <View className="items-center bg-primary-violet rounded-md p-4">
          <Ionicons name="walk" size={24} color="orange" />
          <Text className="text-white text-xl font-bold">
            {distance.toFixed(1)} km
          </Text>
        </View>

        <View className="items-center bg-primary-violet rounded-md p-4">
          <Ionicons name="flame" size={24} color="red" />
          <Text className="text-white text-xl font-bold">
            {calories.toFixed(1)} kcal
          </Text>
        </View>

        <View className="items-center bg-primary-violet rounded-md p-4">
          <Ionicons name="speedometer" size={24} color="gold" />
          <Text className="text-white text-xl font-bold">
            {speed.toFixed(1)} km/hr
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StatsCard;
