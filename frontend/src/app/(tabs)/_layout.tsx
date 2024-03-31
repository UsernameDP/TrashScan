import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { View, Text } from "react-native";

import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={25}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true)
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="home"
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="Map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="map"
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="Camera"
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="camera"
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="Folder"
        options={{
          title: "Folder",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="folder"
              color={color}
            />
          )
        }}
      />

      <Tabs.Screen
        name="About"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="info-circle"
              color={color}
            />
          )
        }}
      />
    </Tabs>
  );
}
