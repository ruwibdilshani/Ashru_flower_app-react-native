import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for icons
import Icon from "react-native-vector-icons/Ionicons";

// Sample data for flowers
const trendingFlowers = [
    { id: '1', name: 'Lily', price: '$12', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '2', name: 'Orchid', price: '$18', image: 'https://images.pexels.com/photos/2789728/pexels-photo-2789728.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '3', name: 'Rose', price: '$10', image: 'https://images.pexels.com/photos/5944199/pexels-photo-5944199.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '4', name: 'Tulip', price: '$15', image: 'https://images.pexels.com/photos/1108294/pexels-photo-1108294.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
];

const featuredFlowers = [
    { id: '1', name: 'Lily', price: '$12', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '2', name: 'Orchid', price: '$18', image: 'https://images.pexels.com/photos/2789728/pexels-photo-2789728.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '3', name: 'Lily', price: '$12', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '4', name: 'Orchid', price: '$18', image: 'https://images.pexels.com/photos/2789728/pexels-photo-2789728.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '5', name: 'Lily', price: '$12', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '6', name: 'Orchid', price: '$18', image: 'https://images.pexels.com/photos/2789728/pexels-photo-2789728.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
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
    { id: '2', name: 'Tulip', price: '$15', category: 'Tulips', image: 'https://images.pexels.com/photos/1108294/pexels-photo-1108294.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '3', name: 'Lily', price: '$12', category: 'Lilies', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '4', name: 'Orchid', price: '$18', category: 'Orchids', image: 'https://images.pexels.com/photos/2789728/pexels-photo-2789728.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '5', name: 'Sunflower', price: '$8', category: 'Sunflowers', image: 'https://images.pexels.com/photos/36469/sunflower-flowers-yellow-nature-36469.jpg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '6', name: 'Lily', price: '$12', category: 'Lilies', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '7', name: 'Lily', price: '$12', category: 'Lilies', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    { id: '8', name: 'Lily', price: '$12', category: 'Lilies', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
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
