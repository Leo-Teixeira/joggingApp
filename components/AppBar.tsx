import React from "react";
import "@/global.css";
import { Text, Image, TouchableOpacity } from "react-native";
import { Box } from "./ui/box";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";

export default function Header() {
  return (
    <Box className="bg-primary-violet rounded-b-3xl p-4 mb-4 h-56">
      <HStack className="items-center justify-between mt-8">
        <HStack className="items-center">
          <Image
            source={require("../assets/images/avatar.png")}
            className="w-12 h-12 rounded-full mr-3"
          />
          <VStack>
            <Text className="text-white text-lg font-bold">Hello, Andrew</Text>
            <Text className="text-blue-200 text-sm">Beginner</Text>
          </VStack>
        </HStack>
        <TouchableOpacity className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl mr-3">⚙️</Text>
        </TouchableOpacity>
      </HStack>
      <Box className="block bg-white rounded-xl mt-8 p-4 mb-4 shadow">
        <HStack className=" justify-between items-center">
          <HStack className="justify-start items-center gap-2">
            <Text className="text-lg font-bold">Week goal</Text>
            <Text className="text-purple-950 font-bold">50 km</Text>
          </HStack>
          <TouchableOpacity className="flex-row justify-between items-center mb-4">
            <Image
              source={require("../assets/images/arrow.png")}
              className="w-4 h-4"
            />
          </TouchableOpacity>
        </HStack>
        <HStack className="justify-between">
          <Text className="text-gray-500 text-sm">35 km done</Text>
          <Text className="text-gray-500 text-sm">15 km left</Text>
        </HStack>
        <Box className="bg-violet-300 h-2 my-2 rounded-lg">
          <Box
            className="bg-primary-violet h-2 rounded-lg"
            style={{ width: "70%" }}></Box>
        </Box>
      </Box>
    </Box>
  );
}
