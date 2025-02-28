import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { Flower } from "../model/Flower";



const initialState: Flower[] = [];

const api = axios.create({
    baseURL: "http://localhost:4000/flowers"
});


export const saveProduct = createAsyncThunk(
    'flowers/saveProduct',
    async (product: Flower, { rejectWithValue }) => {
        try {
            console.log("Producaaaaat:", product);
            const response = await api.post('/add', product);
            return response.data;
        } catch (error: any) {
            console.error("Error saving product:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Error saving product");
        }
    }
);


export const updateProduct = createAsyncThunk(
    'flowers/updateProduct',
    async (product: Flower, { rejectWithValue }) => {
        try {
            const response = await api.put(`/update/${product.code}`, product);
            return response.data;
        } catch (error: any) {
            return console.log('Error:', error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'flowers/removeProduct',
    async (code: string, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/remove/${code}`);
            return response.data;
        } catch (error: any) {
            return console.log('Error:', error);
        }
    }
);

export const getAllProducts = createAsyncThunk(
    'flowers/getAllProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/all');
            return response.data;
        } catch (error: any) {
            return console.log('Error:', error);
        }
    }
);

export const flowerSlice = createSlice({
    name: 'flowers',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(saveProduct.pending, (state, action) => {
                console.log('product pending');
            })
            .addCase(saveProduct.rejected, (state, action) => {
                console.log('Product reject Successfully');
            })
            .addCase(saveProduct.fulfilled, (state, action) => {
                state.push(action.payload);


            });
        builder
            .addCase(updateProduct.rejected, (state, action) => {
                console.log('Product reject Successfully');
            })
            .addCase(updateProduct.pending, (state, action) => {
                console.log('Product pending');
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.findIndex((product: Flower) => product.code === action.payload.batchCode);
                state[index] = action.payload;
                alert("Product Updated Successfully");
            });
        builder
            .addCase(deleteProduct.rejected, (state, action) => {
                console.log('Product reject Successfully');
            })
            .addCase(deleteProduct.pending, (state, action) => {

            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                return state.filter((product) => product.code !== action.payload.batchCode);
            });
        builder
            .addCase(getAllProducts.rejected, (state, action) => {
                console.log('Product reject Successfully');
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                action.payload.forEach((product: Flower) => {
                    state.push(product);
                });
            })
            .addCase(getAllProducts.pending, (state, action) => {
                console.log('Product reject Successfully');
            });
    }
});

export default flowerSlice.reducer;
