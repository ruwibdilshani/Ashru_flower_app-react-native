import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for icons
import Icon from "react-native-vector-icons/Ionicons";

// Sample data for flowers
const trendingFlowers = [
    { id: '1', name: 'Lily', price: '$12', image: 'https://images.unsplash.com/photo-1704728323042-0c4cf765e9e9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '2', name: 'Orchid', price: '$18', image: 'https://images.unsplash.com/photo-1534885320675-b08aa131cc5e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '3', name: 'Rose', price: '$10', image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?q=80&w=1402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '4', name: 'Tulip', price: '$15', image: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const featuredFlowers = [
    { id: '1', name: 'Lily', price: '$12', image: 'https://images.unsplash.com/photo-1704728323042-0c4cf765e9e9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '2', name: 'Orchid', price: '$18', image: 'https://images.unsplash.com/photo-1599463740831-a5015ef7b65a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '3', name: 'Lily', price: '$12', image: 'https://images.unsplash.com/photo-1567428051128-5f09a0200655?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '4', name: 'Orchid', price: '$18', image: 'https://images.unsplash.com/photo-1582862058398-c157c8424b54?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '5', name: 'Lily', price: '$12', image: 'https://plus.unsplash.com/premium_photo-1676498578286-94f337c53e81?q=80&w=1428&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '6', name: 'Orchid', price: '$18', image: 'https://plus.unsplash.com/premium_photo-1713823800686-9d13d1df352a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const flowerCategories = [
    { id: '1', name: 'Roses' },
    { id: '2', name: 'Tulips' },
    { id: '3', name: 'Lilies' },
    { id: '4', name: 'Orchids' },
    { id: '5', name: 'Sunflowers' },

];

const allFlowers = [
    { id: '1', name: 'Rose', price: '$10', category: 'Roses', image: 'https://images.pexels.com/photos/5944199/pexels-photo-5944199.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '2', name: 'Tulips', price: '$15',category: 'Tulips', image: 'https://images.unsplash.com/photo-1589994160839-163cd867cfe8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '3', name: 'Lily', price: '$12', category: 'Lilies', image: 'https://plus.unsplash.com/premium_photo-1676498578286-94f337c53e81?q=80&w=1428&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '4', name: 'Orchid', price: '$18', category: 'Orchids', image: 'https://images.unsplash.com/photo-1598797369458-efbff9e6dc22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '5', name: 'Sunflower', price: '$8', category: 'Sunflowers', image: 'https://images.unsplash.com/photo-1551945326-df678a97c3af?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '6', name: 'Lily', price: '$12', category: 'Lilies', image: 'https://images.unsplash.com/photo-1452957689853-fd2b4f3d3aa2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '7', name: 'Orchid', price: '$18', category: 'Orchids', image: 'https://images.unsplash.com/photo-1598797369458-efbff9e6dc22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '8', name: 'Sunflower', price: '$8', category: 'Sunflowers', image: 'https://images.unsplash.com/photo-1551945326-df678a97c3af?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '9', name: 'Rose', price: '$10', category: 'Roses', image: 'https://images.unsplash.com/photo-1518709779341-56cf4535e94b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '10', name: 'Tulips', price: '$15', category: 'Tulips', image: 'https://plus.unsplash.com/premium_photo-1677620614560-5f1b32416563?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: '12', name: 'Orchid', price: '$18', category: 'Orchids', image: 'https://images.unsplash.com/photo-1598797369458-efbff9e6dc22?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

export default function HomeScreen() {
    const [isSearching, setIsSearching] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Filter the flowers based on selected category
    const filteredFlowers = selectedCategory
        ? allFlowers.filter(flower => flower.category === selectedCategory)
        : allFlowers;

    const renderFlowerItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.flowerImage} />
            <View style={styles.cardContent}>
                <Text style={styles.flowerName}>{item.name}</Text>
                <Text style={styles.flowerPrice}>{item.price}</Text>
            </View>
        </View>
    );

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryCard,
                selectedCategory === item.name && styles.selectedCategoryCard
            ]}
            onPress={() => setSelectedCategory(item.name)}
        >
            <Text
                style={[
                    styles.categoryName,
                    selectedCategory === item.name && styles.selectedCategoryText
                ]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );


    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={{ marginTop: 50 ,}}>
                {!isSearching ? (
                    <View style={styles.navbar}>
                        <Text style={styles.title}>AshRu Shops</Text>
                        <TouchableOpacity onPress={() => setIsSearching(true)}>
                            <Ionicons name="search" size={24} color="#363636" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TextInput
                        label="Search"
                        mode="outlined"
                        style={styles.inputExpanded}
                        activeOutlineColor="#363636"
                        right={
                            <TextInput.Icon icon="close" onPress={() => setIsSearching(false)} />
                        }
                    />
                )}
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>


                {/* Trending Flowers Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trending Flowers</Text>
                    <FlatList
                        data={trendingFlowers}
                        renderItem={renderFlowerItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Featured Flowers Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Featured Flowers</Text>
                    <FlatList
                        data={featuredFlowers}
                        renderItem={renderFlowerItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Flower Categories Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Flower Categories</Text>
                    <FlatList
                        data={flowerCategories}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                {/* Flowers of Selected Category Section */}
                {selectedCategory && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{selectedCategory} Flowers</Text>
                        <FlatList
                            data={filteredFlowers}
                            renderItem={renderFlowerItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}
            </ScrollView>

            {/* Floating Add Button */}
            {/*<TouchableOpacity*/}
            {/*    onPress={() => console.log('Add entry pressed')}*/}
            {/*    style={styles.addButton}*/}
            {/*>*/}
            {/*    <Icon name="add" size={28} color="#fff" />*/}
            {/*</TouchableOpacity>*/}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20,
    },
    scrollContainer: {

    },
    navbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: "#ff0000",
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "900",
        color: "#363636",

    },
    inputExpanded: {
        backgroundColor: "transparent",
        width: "100%",
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        backgroundColor: "#d1d0d0",
        borderRadius: 12,
        padding:8,
        fontSize: 16,
        fontWeight: "bold",
        color: "#363636",
        marginBottom: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        width: 150,
        marginRight: 15,
        elevation: 5,
        shadowColor: "#80004c",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    flowerImage: {
        width: "100%",
        height: 100,
        borderRadius: 12,
    },
    cardContent: {
        padding: 10,
    },
    flowerName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#363636",
    },
    flowerPrice: {
        fontSize: 14,
        color: "#FF1493",
    },
    categoryCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        marginRight: 15,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    categoryName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#363636",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#363636",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedCategoryCard: {
        backgroundColor: "#FF1493", // Pink background when selected
    },
    selectedCategoryText: {
        color: "#fff", // White text when selected
    },

});
