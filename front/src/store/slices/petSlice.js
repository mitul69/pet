import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../util/axiosInstance';

export const fetchInitialData = createAsyncThunk(
    'pet/fetchInitialData',
    async () => {
        const response = await axiosInstance.get('categories'); // Replace with your API endpoint
        return response.data; // Assuming the response contains a list of categories
    }
);

export const getBreedsById = createAsyncThunk(
    'pet/getBreedsById',
    async (id) => {
        const response = await axiosInstance.get(`categories/${id}/breeds`); // Replace with your API endpoint
        return response.data; // Assuming the response contains a list of categories
    }
);

export const createPet = createAsyncThunk(
    'pet/createPet',
    async (data) => {
        const response = await axiosInstance.post(`pet`, data); // Replace with your API endpoint
        return response.data; // Assuming the response contains a list of categories
    }
);


const initialState = {
    loading: false,
    categories: [],
    breeds: [],
};

const petSlice = createSlice({
    name: 'pet',
    initialState,
    reducers: {
        setBreeds: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInitialData.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchInitialData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getBreedsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBreedsById.fulfilled, (state, action) => {
                state.loading = false;
                state.breeds = action.payload;
            })
            .addCase(getBreedsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createPet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPet.fulfilled, (state, action) => {
                state.loading = false;
                state.created = true;
            })
            .addCase(createPet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        ;
    },

});

export const { setBreeds } = petSlice.actions;
export default petSlice.reducer;
