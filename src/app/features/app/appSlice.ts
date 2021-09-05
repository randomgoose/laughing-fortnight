import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AppState {
    chartType: 'line' | 'bar' | 'pie' | 'area';
    dataSource: 'mock' | 'file' | 'sheet' | null;
    selectionId: string;
    showAdvancedConfig: boolean;
    rndEnabled: boolean;
    hideInterface: boolean;
}

const initialState: AppState = {
    chartType: 'line',
    dataSource: null,
    selectionId: '',
    showAdvancedConfig: false,
    rndEnabled: false,
    hideInterface: false,
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
        setRndEnabled: (state, action: PayloadAction<boolean>) => {
            state.rndEnabled = action.payload;
        },
        setHideInterface: (state, action: PayloadAction<boolean>) => {
            state.hideInterface = action.payload;
        },
    },
});

export const {setChartType, setSelectionId, setDataSource, setRndEnabled, setHideInterface} = appSlice.actions;

export default appSlice.reducer;
