import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import HomeScreen from "../componet/HomeScreen";
import FlowerScreen from "./screens/FlowerScreen";
import FlowerItemScreen from "./screens/FlowerItemScreen";
import CartScreen from "./screens/CartScreen";
import { Ionicons } from "react-native-vector-icons"; // Import icons

const Tab = createBottomTabNavigator();

export default function TabController() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#fff", // Background color of tab bar
                    borderTopWidth: 0, // Removes top border
                    height: 80, // Adjust height
                    paddingBottom: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12, // Adjust font size
                    fontWeight: "bold",
                    marginBottom: 5,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Flower") {
                        iconName = focused ? "flower" : "flower-outline";
                    } else if (route.name === "FlowerItem") {
                        iconName = focused ? "leaf" : "leaf-outline";
                    } else if (route.name === "Cart") {
                        iconName = focused ? "cart" : "cart-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#ff5733", // Active icon color
                tabBarInactiveTintColor: "gray", // Inactive icon color
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Flower" component={FlowerScreen} />
            <Tab.Screen name="FlowerItem" component={FlowerItemScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
        </Tab.Navigator>
    );
}
