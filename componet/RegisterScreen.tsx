import React, { useState } from "react";
import {Alert, AppState} from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Poppins_400Regular, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {register} from "../slice/userSlice";

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};

export default function RegisterScreen() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Poppins_500Medium,
        Poppins_600SemiBold
    });

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch<AppDispatch>();
    // State to track form fields and checkbox
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    function handleRegister() {
        if (!name || !email || !password) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }

        if (!isChecked) {
            Alert.alert("Error", "You must agree to the terms and conditions.");
            return;
        }

        // Proceed with registration (send data to backend, etc.)
        const userData = {
            name,
            email,
            password
        };

        dispatch(register(userData))

        navigation.navigate("Login");
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={{ fontSize: 24, fontFamily: "Poppins_700Bold", textAlign: "center", color: "#363636", marginVertical: -5 }}>
                Welcome to AshRu
            </Text>
            <Text style={{ color: "#878C8F", textAlign: "center", fontFamily: "Poppins_500Medium", marginBottom: 20 }}>
                Sign up to continue
            </Text>

            <TextInput
                label="Name"
                mode="outlined"
                style={styles.input}
                activeOutlineColor="#363636"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                activeOutlineColor="#363636"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                label="Password"
                mode="outlined"
                style={styles.input}
                activeOutlineColor="#363636"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <Checkbox
                    color={"#bf00f1"}
                    status={isChecked ? "checked" : "unchecked"}
                    onPress={() => setIsChecked(!isChecked)}
                />
                <Text style={{ fontFamily: "Poppins_500Medium" }}>
                    I agree to the terms and conditions
                </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ marginTop: 20, flexDirection: "row", justifyContent: "center" }}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={{ color: "#363636", fontFamily: "Poppins_400Regular" }}>
                    If you have one?{" "}
                </Text>
                <Text style={{ color: "#363636", fontFamily: "Poppins_600SemiBold" }}>
                    Sign In
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F8FB",
        padding: 20,
        paddingTop: 50,
        justifyContent: "center",
        fontFamily: "Poppins_400Regular",
    },
    input: {
        backgroundColor: "transparent",
        marginBottom: 20,
        color: "#363636",
        fontFamily: "Poppins_400Regular",
    },
    button: {
        width: "100%",
        backgroundColor: "#d601c3",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontFamily: "Poppins_500Medium",
    },
});
