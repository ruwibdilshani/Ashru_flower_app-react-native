import { Text, View, Button, FlatList, Alert, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Flower } from "../../model/Flower";

export default function CartScreen() {
    const [cart, setCart] = useState<{ item: Flower; quantity: number }[]>([]);

    const flowers: Flower[] = [
        { id: '1', name: 'Lily', price: '20', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
        { id: '2', name: 'Orchid', price: '18', image: 'https://images.pexels.com/photos/2789728/pexels-photo-2789728.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
        { id: '3', name: 'Lily', price: '20', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
        { id: '4', name: 'Orchid', price: '18', image: 'https://images.pexels.com/photos/2789728/pexels-photo-2789728.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
        { id: '5', name: 'Lily', price: '20', image: 'https://images.pexels.com/photos/3563781/pexels-photo-3563781.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
        { id: '6', name: 'Orchid', price: '18', image: 'https://images.pexels.com/photos/2789728/pexels-photo-2789728.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260' },
    ];

    const addToCart = (flower: Flower) => {
        const existingItem = cart.find((cartItem) => cartItem.item.id === flower.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.item.id === flower.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {
            setCart([...cart, { item: flower, quantity: 1 }]);
        }
    };

    const removeFromCart = (flower: Flower) => {
        const existingItem = cart.find((cartItem) => cartItem.item.id === flower.id);
        if (existingItem) {
            if (existingItem.quantity > 1) {
                setCart(cart.map(cartItem =>
                    cartItem.item.id === flower.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                ));
            } else {
                setCart(cart.filter(cartItem => cartItem.item.id !== flower.id));
            }
        }
    };

    const getTotalPrice = () => {
        return cart
            .reduce((total, cartItem) => total + Number(cartItem.item.price) * cartItem.quantity, 0)
            .toFixed(2);
    };

    const handleBuy = () => {
        if (cart.length === 0) {
            Alert.alert("Cart is empty", "Please add flowers before buying.");
            return;
        }
        Alert.alert("Purchase Successful", `Total: $${getTotalPrice()}`, [
            { text: "OK", onPress: () => setCart([]) }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flower Store</Text>

            {/* Flower List - Takes up 1/2 of the screen */}
            <View style={styles.flowerListContainer}>
                <FlatList
                    data={flowers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.detailsContainer}>
                                <Text style={styles.flowerText}>{item.name} - ${item.price}</Text>
                                <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                                    <Text style={{color : "#ffffff" , fontWeight : "bold"}}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>

            {/* Cart Items - Takes up 1/2 of the screen */}
            <View style={styles.cartContainer}>
                <Text style={styles.title}>🛒 Cart Items:</Text>
                {cart.length > 0 ? (
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.item.id}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Text style={styles.cartText}>{item.item.name} - ${item.item.price} x {item.quantity}</Text>
                                <View style={styles.quantityControls}>
                                    <TouchableOpacity style={styles.minusButton} onPress={() => removeFromCart(item.item)}>
                                        <Text style={styles.buttonText}>➖</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.plusButton} onPress={() => addToCart(item.item)}>
                                        <Text style={styles.buttonText}>➕</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.emptyCart}>🛒 Cart is empty</Text>
                )}

                {/* Buy Now Button */}
                {cart.length > 0 && (
                    <View style={styles.footer}>
                        <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
                        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
                            <Text style={styles.buttonText}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1, // Ensures the whole screen is used
            backgroundColor: "#f8f8f8",
            padding: 20,
            top: 50,
        },
        flowerListContainer: {
            flex: 0.5, // Takes half of the screen
        },
        cartContainer: {
            flex: 0.5, // Takes half of the screen
            backgroundColor: "#fff",
            padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
        },
        title: {
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 10,
        },
        card: {
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
        },
        image: {
            width: 100,
            height: 100,
            borderRadius: 10,
            marginRight: 10,
        },
        flowerText: {
            fontSize: 18,
            fontWeight: "bold",
        },
        addButton: {
            backgroundColor: "#d601c3",
            padding: 10,
            gap: 5,
            borderRadius: 5,
            marginTop: 10,
            alignSelf: "flex-start",
        },
        cartItem: {
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 5,
            backgroundColor: "#fff",
        },
        cartText: {
            fontSize: 16,
        },
        quantityControls: {
            flexDirection: "row",
            gap: 10,
        },
        minusButton: {
            backgroundColor: "red",
            padding: 5,
            borderRadius: 5,
            marginHorizontal: 5,
        },
        plusButton: {
            backgroundColor: "green",
            padding: 5,
            borderRadius: 5,
            marginHorizontal: 5,
        },
        emptyCart: {
            fontSize: 16,
            color: "gray",
            textAlign: "center",
        },
        footer: {
            backgroundColor: "#fff",
            marginTop: 5,
            alignItems: "center",
            bottom: 40,
        },
        totalText: {
            fontSize: 18,
            fontWeight: "bold",
        },
        buyButton: {
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
        },
    });
