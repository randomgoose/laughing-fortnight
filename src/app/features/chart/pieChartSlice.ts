import {createSlice} from '@reduxjs/toolkit';
import {data} from '../../data/basePieData';

export interface PieChartState {
    data: Object[];
}

const initialState: PieChartState = {
    data,
};

export const pieChartSlice = createSlice({
    name: 'pie',
    initialState,
    reducers: {},
});

export const {} = pieChartSlice.actions;

export default pieChartSlice.reducer;
