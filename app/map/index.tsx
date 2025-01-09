import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import * as Location from "expo-location";
import StatsCard from "./components/statCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JoggingScreen: React.FC = () => {
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [route, setRoute] = useState<Coordinate[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [pausedTime, setPausedTime] = useState(0);

  useEffect(() => {
    const initializeLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      setLocation({ latitude, longitude });
    };

    initializeLocation();
  }, []);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;
    let locationSubscription: Location.LocationSubscription | undefined;

    if (isRunning) {
      const initialStartTime = Date.now() - pausedTime;
      setStartTime(initialStartTime);

      timerInterval = setInterval(() => {
        const timeDiff = Date.now() - initialStartTime;
        const hours = Math.floor(timeDiff / 3600000);
        const minutes = Math.floor((timeDiff % 3600000) / 60000);
        const seconds = Math.floor((timeDiff % 60000) / 1000);

        setElapsedTime(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }, 1000);

      const startTracking = async () => {
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 5
          },
          (newLocation) => {
            const { latitude, longitude } = newLocation.coords;
            const newPoint = { latitude, longitude };

            setLocation(newPoint);

            setRoute((prevRoute) => {
              if (prevRoute.length > 0) {
                const lastPoint = prevRoute[prevRoute.length - 1];
                const segmentDistance = calculateDistance(
                  lastPoint.latitude,
                  lastPoint.longitude,
                  latitude,
                  longitude
                );
                setDistance((prevDistance) => prevDistance + segmentDistance);
                const timeInHours = 5 / 3600;
                setSpeed(segmentDistance / timeInHours);
                setCalories(
                  (prevCalories) => prevCalories + segmentDistance * 70
                );
              }

              return [...prevRoute, newPoint];
            });
          }
        );
      };

      startTracking();
    } else {
      if (timerInterval) clearInterval(timerInterval);
      if (startTime) {
        setPausedTime(
          (prevPausedTime) => prevPausedTime + (Date.now() - startTime)
        );
      }
      if (locationSubscription) {
        locationSubscription.remove();
      }
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [isRunning]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const toRad = (value: number): number => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const onPause = async () => {
    try {
      setIsRunning(false);
      await AsyncStorage.setItem(
        "currentJogging",
        JSON.stringify({
          time: elapsedTime,
          distance: distance.toFixed(1),
          calories: calories.toFixed(1),
          speed: speed.toFixed(1)
        })
      );
    } catch (error) {
      console.error("Error updating current jogging data:", error);
    }
  };

  const onStop = async () => {
    try {
      const storedData = await AsyncStorage.getItem("joggingData");
      let previousParkours: Parkour[] = [];
      if (storedData) {
        try {
          previousParkours = JSON.parse(storedData);
          if (!Array.isArray(previousParkours)) {
            throw new Error("Invalid data format");
          }
        } catch {
          previousParkours = [];
        }
      }

      const newParkour: Parkour = {
        time: elapsedTime,
        distance: distance.toFixed(1),
        calories: calories.toFixed(1),
        speed: speed.toFixed(1),
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric"
        })
      };

      const updatedParkours = [newParkour, ...previousParkours];

      await AsyncStorage.setItem(
        "joggingData",
        JSON.stringify(updatedParkours)
      );

      setStartTime(null);
      setElapsedTime("00:00:00");
      setPausedTime(0);
      setSpeed(0);
      setCalories(0);
      setDistance(0);
      setRoute([]);
      await AsyncStorage.removeItem("currentJogging");
    } catch (error) {
      console.error("Error updating jogging data:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        showsUserLocation
        followsUserLocation>
        {location && <Marker coordinate={location} title="Vous êtes ici" />}
        {route.length > 1 && (
          <Polyline coordinates={route} strokeColor="#1E90FF" strokeWidth={4} />
        )}
      </MapView>
      <StatsCard
        time={elapsedTime}
        distance={distance}
        calories={calories}
        speed={speed}
        isRunning={isRunning}
        onStop={onStop}
        onResume={() => setIsRunning(true)}
        onPause={onPause}
      />
    </View>
  );
};

export default JoggingScreen;
