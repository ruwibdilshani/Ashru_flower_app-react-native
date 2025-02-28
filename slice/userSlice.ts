import axios, {} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../model/User";

const initialState: User[] = [];

const api = axios.create({
    baseURL: "http//192.168.142.2:3000/userAdmin"
});

/*192.168.142.2*/

export const register = createAsyncThunk(
    'userAdmin/register',
    async (user: User, { rejectWithValue }) => {
        try {
            console.log("User:", user);
            const response = await api.post('/register', user);
            return response.data;
        } catch (error: any) {

            console.error("Error saving user:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Error saving user");
        }
    }
);

export const login = createAsyncThunk(
    'userAdmin/login',
    async (user: User, { rejectWithValue }) => {
        try {
            const response = await api.post('/login', user);
            return response.data;
        } catch (error: any) {
            return console.log('Error:', error);
        }
    }
);

export const userSlice = createSlice({
    name: 'userAdmin',
    initialState,
    reducers: {
        logout: (state) => {
            state = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            console.log("Action:", action);
            state.push(action.payload);
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.push(action.payload);
        });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
