import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

// Async thunk to register a new user
export const registerUser = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/register`,
				userData
			);
			const user = response.data.user;
			const access_token = response.data.access_token;
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("token", JSON.stringify(access_token));

			return user, access_token;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.errors);
		}
	}
);

// Login User and get the token from backend to store on client
export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (userCredential, thunkAPI) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/login`,
				userCredential
			);
			const access_token = response.data.access_token;
			const expire_token = response.data.expires_in;
			const user = response.data.user;

			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("token", JSON.stringify(access_token));
			localStorage.setItem("expires_in", expire_token);
			return access_token, user;
		} catch (err) {
			// Handle errors by returning a rejected promise with the error message
			return thunkAPI.rejectWithValue(err.response.data.errors);
		}
	}
);

// Get user by authorizing JWT token that has been generated from backend
export const getCurrentUser = createAsyncThunk(
	"auth/getCurrentUser",
	async (thunkAPI) => {
		try {
			let token = localStorage.getItem("token") ?? "";
			token = token.replace(/"/g, "");
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/auth/profile`,
				{
					headers: {
						Accept: `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(response.data.user);
			return response.data.user;
		} catch (err) {
			// Handle errors by returning a rejected promise with the error message
			return thunkAPI.rejectWithValue(err.response.data.errors);
		}
	}
);

// Create a user slice
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.isLoading = false;
			state.currentUser = null;
		},
	},
	extraReducers: (builder) => {
		// Reducers for handling registration actions
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null; // Clear any previous errors
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload; // Set the error message
			});

		// Reducers for handling login actions
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null; // Clear any previous errors
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload; // Set the error message
			});

		builder
			.addCase(getCurrentUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getCurrentUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload;
			})
			.addCase(getCurrentUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
