import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchWebsites = createAsyncThunk(
    "websites/fetchWebsites",
    async () => {
        const response = await fetch(`${API_BASE_URL}/websites`, {
            cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to fetch websites");
        const result = await response.json();
        return result.data;
    }
);

export const fetchWebsiteById = createAsyncThunk(
    "websites/fetchWebsiteById",
    async (id) => {
        const response = await fetch(`${API_BASE_URL}/websites/${id}`, {
            cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to fetch website detail");
        const result = await response.json();
        return result.data;
    }
);

const websiteSlice = createSlice({
    name: "websites",
    initialState: {
        websiteList: [],
        singleWebsite: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWebsites.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchWebsites.fulfilled, (state, action) => {
                state.loading = false;
                state.websiteList = action.payload;
            })
            .addCase(fetchWebsites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchWebsiteById.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchWebsiteById.fulfilled, (state, action) => {
                state.loading = false;
                state.singleWebsite = action.payload;
            })
            .addCase(fetchWebsiteById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default websiteSlice.reducer;
