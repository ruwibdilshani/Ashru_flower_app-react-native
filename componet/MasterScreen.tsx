import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export default function LoginScreen() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
        <Image
        source={require("../assets/image copy 2.png")}
        style={{ width: "100%", height: 300, marginBottom: -30 }}
      />
      <Text
        style={{
          fontSize: 24,
          fontFamily: "Poppins_700Bold",
          textAlign: "center",
          color: "#363636",
          marginTop: 20,
        }}
      >
        Welcome to Encrypto
      </Text>
      <Text
        style={{
          color: "#878C8F",
          textAlign: "center",
          fontFamily: "Poppins_500Medium",
          marginBottom: 20,
        }}
      >
        Enter master password to continue
      </Text>

      <TextInput
        label="Master Password"
        mode="outlined"
        style={styles.input}
        activeOutlineColor="#363636"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ color: "#363636", fontFamily: "Poppins_400Regular" }}>
          If you wot to switch account ?{" "}
        </Text>
        <Text style={{ color: "#363636", fontFamily: "Poppins_600SemiBold" }}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FB",
    padding: 20,
    fontFamily: "Poppins_400Regular",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "transparent",
    marginBottom: 20,
    color: "#363636",
    fontFamily: "Poppins_400Regular",
  },
  button: {
    width: "100%",
    backgroundColor: "#363636",
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
