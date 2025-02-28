import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { Flower } from "../model/Flower";

interface AddFlowerPopUpProps {
  visible: boolean;
  onClose: () => void;
  onSave: (e:Flower) => void;
}

const AddFlowerPopUp: React.FC<AddFlowerPopUpProps> = ({ visible, onClose, onSave }) => {
  //const [code, setCode] = useState("");
  const [flowerImage, setImage] = useState<string | null>(null);
  const [flowerName, setFlowerName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");






  const handleSave = () => {
    const flowerData = {  flowerImage, flowerName, category, price ,};
    console.log("Saved Flower Data:", flowerData);
    onSave(flowerData);
    onClose();
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Flower</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>

          <TextInput label="Flower Name" value={flowerName} onChangeText={setFlowerName} style={styles.input} />
          <TextInput label="Category" value={category} onChangeText={setCategory} style={styles.input} />
          <TextInput keyboardType={"numeric"}  label="Price "  value={price} onChangeText={setPrice} style={styles.input} />

          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>Pick an Image</Text>
          </TouchableOpacity>

          {flowerImage && <Image source={{ uri: flowerImage }} style={styles.imagePreview} />}

          <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
            Save
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 10,
    padding: 5,
  },
  input: {

    width: "100%",
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontFamily: "Poppins_400Regular",
    backgroundColor: "transparent",
  },
  imagePicker: {
    backgroundColor: "#fdc9f9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  imagePickerText: {
    fontFamily: "Poppins_500Medium",
    color: "#000",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#d601c3",
    width: "100%",
    fontFamily: "Poppins_500Medium",
  },
});

export default AddFlowerPopUp;
