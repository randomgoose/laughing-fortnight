import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AppState {
    chartType: 'line' | 'bar' | 'pie' | 'area';
    selectionId: string;
}

const initialState: AppState = {
    chartType: 'line',
    selectionId: '',
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setChartType: (state, action: PayloadAction<'line' | 'bar' | 'pie' | 'area'>) => {
            state.chartType = action.payload;
        },
        setSelectionId: (state, action: PayloadAction<string>) => {
            state.selectionId = action.payload;
        },
    },
});

export const {setChartType, setSelectionId} = appSlice.actions;

export default appSlice.reducer;
