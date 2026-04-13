import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CollegeState {
    selectedCollegeIds: string[];
    currentType: string;
    searchQuery: string;
    page: number;
    limit: number;
}

const initialState: CollegeState = {
    selectedCollegeIds: [],
    currentType: "all",
    searchQuery: "",
    page: 1,
    limit: 10,
};

const collegeSlice = createSlice({
    name: 'college',
    initialState,
    reducers: {
        setCurrentType: (state, action: PayloadAction<string>) => {
            state.currentType = action.payload;
            state.page = 1; // Reset to page 1 on filter change
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.page = 1;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
            state.page = 1;
        },
    },
});

export const { setCurrentType, setSearchQuery, setPage, setLimit } = collegeSlice.actions;
export default collegeSlice.reducer;
