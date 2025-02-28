import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./componet/LoginScreen";
import TabController from "./app/Tab";
import RegisterScreen from "./componet/RegisterScreen";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const Stack = createStackNavigator();

    // Simulate a loading delay before navigating to the main screen
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 5000); // Set to 5000ms (5 seconds) for a longer loading time
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Lottie Animation */}
                <LottieView
                    source={require('./assets/Main Scene.json')} // Path to the Lottie animation
                    autoPlay
                    loop
                    style={styles.animation}
                />

                <Text style={styles.loadingText}>AshRu</Text>
            </View>
        );
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: true, // Enable gestures
                        cardStyleInterpolator: ({ current, next, layouts }) => {
                            return {
                                cardStyle: {
                                    transform: [
                                        {
                                            translateX: current.progress.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [layouts.screen.width, 0], // Right-to-left animation
                                            }),
                                        },
                                    ],
                                },
                            };
                        },
                    }}
                >
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Tab" component={TabController} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    animation: {
        width: 200, // Adjust the size of the animation as needed
        height: 200,
    },
    loadingText: {
        fontSize: 20,
        color: '#8f009f',
        marginTop: 20,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
    },
});
