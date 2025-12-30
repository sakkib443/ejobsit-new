import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchSoftware = createAsyncThunk(
    "software/fetchSoftware",
    async () => {
        const response = await fetch(`${API_BASE_URL}/software`, {
            cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to fetch software");
        const result = await response.json();
        return result.data;
    }
);

export const fetchSoftwareById = createAsyncThunk(
    "software/fetchSoftwareById",
    async (id) => {
        const response = await fetch(`${API_BASE_URL}/software/${id}`, {
            cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to fetch software detail");
        const result = await response.json();
        return result.data;
    }
);

const softwareSlice = createSlice({
    name: "software",
    initialState: {
        softwareList: [],
        singleSoftware: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSoftware.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchSoftware.fulfilled, (state, action) => {
                state.loading = false;
                state.softwareList = action.payload;
            })
            .addCase(fetchSoftware.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSoftwareById.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchSoftwareById.fulfilled, (state, action) => {
                state.loading = false;
                state.singleSoftware = action.payload;
            })
            .addCase(fetchSoftwareById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default softwareSlice.reducer;
