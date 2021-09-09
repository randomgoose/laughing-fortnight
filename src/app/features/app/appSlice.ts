import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SnapshotProps} from '../../components/Snapshot/index';

export interface AppState {
    chartType: 'line' | 'bar' | 'pie' | 'area';
    dataSource: 'mock' | 'file' | 'sheet' | null;
    selectionId: string;
    showAdvancedConfig: boolean;
    rndEnabled: boolean;
    hideInterface: boolean;
    snapshots: SnapshotProps[];
}

const initialState: AppState = {
    chartType: 'line',
    dataSource: null,
    selectionId: '',
    showAdvancedConfig: false,
    rndEnabled: false,
    hideInterface: false,
    snapshots: [],
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
        setSnapshots: (state, action: PayloadAction<SnapshotProps[]>) => {
            state.snapshots = action.payload;
        },
        addSnapshot: (state, action: PayloadAction<SnapshotProps>) => {
            state.snapshots = [action.payload, ...state.snapshots];
        },
        removeSnapshotById: (state, action: PayloadAction<string>) => {
            state.snapshots = state.snapshots.filter((item) => item.id !== action.payload);
        },
    },
});

export const {
    setChartType,
    setSelectionId,
    setDataSource,
    setRndEnabled,
    setHideInterface,
    setSnapshots,
    addSnapshot,
    removeSnapshotById,
} = appSlice.actions;

export default appSlice.reducer;
