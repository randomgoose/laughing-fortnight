import {createSlice} from '@reduxjs/toolkit';

export interface DataState {
    data: any[];
}

const initialState: DataState = {
    data: [],
};

export const appSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
});

// export const {setChartType, setSelectionId} = appSlice.actions;

export default appSlice.reducer;
