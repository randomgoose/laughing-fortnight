import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AppState {
    chartType: 'line' | 'bar' | 'pie' | 'area';
    dataSource: 'mock' | 'file' | 'sheet' | null;
    selectionId: string;
    showAdvancedConfig: boolean;
}

const initialState: AppState = {
    chartType: 'line',
    dataSource: null,
    selectionId: '',
    showAdvancedConfig: false,
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
        setDataSource: (state, action: PayloadAction<'mock' | 'file' | 'sheet' | null>) => {
            state.dataSource = action.payload;
        },
    },
});

export const {setChartType, setSelectionId, setDataSource} = appSlice.actions;

export default appSlice.reducer;
