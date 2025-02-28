import React, { useState } from "react";
import {
    View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, Modal, Animated
} from "react-native";
import {TextInput, Card, Title, Paragraph, Button} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AddFlowerPopUp from "../../componet/AddFlowerPopup";
import { Flower } from "../../model/Flower";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get('window');

export default function FlowerScreen() {
    const dispatch = useDispatch();
    const [isSearching, setIsSearching] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [favorites, setFavorites] = useState<Flower[]>([]);
    const [favoritesModalVisible, setFavoritesModalVisible] = useState(false);
    const slideAnim = useState(new Animated.Value(height))[0];
    const [cart, setCart] = useState<Flower[]>([]);

    const handleAddFlower = (flowerData: Flower) => {
        setFlowers([...flowers, flowerData]);
        setIsModalVisible(false);
    };

    const addToCart = (flower: Flower) => {
        setCart([...cart, flower]);
    };


    const toggleFavorite = (flower: Flower) => {
        if (favorites.includes(flower)) {
            setFavorites(favorites.filter((fav) => fav !== flower));
        } else {
            setFavorites([...favorites, flower]);
        }
    };

    const openFavoritesModal = () => {
        setFavoritesModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const closeFavoritesModal = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setFavoritesModalVisible(false));
    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 50 }}>
                {!isSearching ? (
                    <View style={styles.navbar}>
                        <Text style={styles.title}>Flowers Category</Text>
                        <TouchableOpacity onPress={() => setIsSearching(true)}>
                            <Ionicons name="search" size={24} color="#363636" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openFavoritesModal}>
                            <Ionicons name="heart" size={24} color="#ff4d4d" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TextInput
                        label="Search"
                        mode="outlined"
                        style={styles.inputExpanded}
                        activeOutlineColor="#363636"
                        right={<TextInput.Icon icon="close" onPress={() => setIsSearching(false)} />}
                    />
                )}
            </View>

            <FlatList
                data={flowers}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({ item }) => {
                    const isFavorite = favorites.includes(item);
                    return (
                        <Card style={styles.card}>
                            <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteButton}>
                                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "red" : "gray"} />
                            </TouchableOpacity>
                            <Image source={{ uri: item.flowerImage || "https://images.pexels.com/photos/5944199/pexels-photo-5944199.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" }} style={styles.image} />
                            <Card.Content>
                                <Title>{item.flowerName}</Title>
                                <Paragraph>Code: {item.code}</Paragraph>
                                <Paragraph>Category: {item.category}</Paragraph>
                                <Paragraph>Price: {item.price}</Paragraph>

                                <TouchableOpacity onPress={() => addToCart(item)}>
                                    <Icon name={"cart"} size={30} color={"#FF1493"} style={styles.btn} />
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>
                    );
                }}
            />

            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>

            <AddFlowerPopUp visible={isModalVisible} onClose={() => setIsModalVisible(false)} onSave={handleAddFlower} />

            <Modal transparent visible={favoritesModalVisible} animationType="none">
                <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Favorite Flowers</Text>
                        <TouchableOpacity onPress={closeFavoritesModal}>
                            <Ionicons name="close" size={28} color="#fff"   />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={favorites}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Card style={styles.favoriteCard}>
                                <View style={styles.cardContent}>
                                    <Image
                                        source={{ uri: item.flowerImage || "https://images.pexels.com/photos/5944199/pexels-photo-5944199.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" }}
                                        style={styles.imagefav}
                                    />
                                    <Card.Content style={styles.textContainer}>
                                        <Title>{item.flowerName}</Title>
                                        <Paragraph>Code: {item.code}</Paragraph>
                                        <Paragraph>Price: {item.price}</Paragraph>

                                        <TouchableOpacity onPress={() => addToCart(item)}>

                                            <Button mode="contained" onPress={() => addToCart(item)} style={[{ alignSelf: 'flex-start' ,
                                               right: 0,
                                               left: 100,
                                                backgroundColor: "#FF69B4",
                                                width: 100,

                                            }]}>
                                                Order
                                            </Button>

                                        </TouchableOpacity>

                                    </Card.Content>
                                </View>
                            </Card>
                        )}
                    />
                </Animated.View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fbf3f7", padding: 10 },
    navbar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 20 },
    title: { fontSize: 22, fontWeight: "bold", color: "#363636" },
    inputExpanded: { backgroundColor: "transparent", width: "100%" },
    card: { margin: 10, borderRadius: 12, width: width / 2 - 30 },
    image: { width: "100%", height: 120, borderRadius: 12 },
    addButton: { position: "absolute", bottom: 25, right: 25, backgroundColor: "#363636", padding: 15, borderRadius: 30 },
    favoriteButton: { position: "absolute", top: 6, right: 6, backgroundColor: "rgba(255,255,255,0.7)", borderRadius: 20, padding: 5 ,zIndex: 1 },
    modalContainer: { position: "absolute", bottom: 0, width: "100%", height: "80%", backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, backgroundColor: "#bf00a6", borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    modalTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
    btn: {
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: 0,
        zIndex: 1,
    },

    favoriteCard: {
            backgroundColor: "rgb(255,220,224)",
            margin: 10,
            borderRadius: 12,
            padding: 10,
            flexDirection: "row", // Ensures the image and text are side by side
            alignItems: "center", // Centers items vertically
        },
        cardContent: {
            flexDirection: "row",
            alignItems: "center",

        },
        imagefav: {
            width: 100,
            height: 100,
            borderRadius: 12,
        },
        textContainer: {
            marginLeft: 10,
        },

});
