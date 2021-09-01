import {BarDatum, BarSvgProps} from '@nivo/bar';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {data} from '../../data/baseBarData';

export interface ChartState extends BarSvgProps<BarDatum> {
    data: BarDatum[];
}

const initialState: ChartState = {
    height: 0,
    width: 0,
    data: data,
    groupMode: 'grouped',
    layout: 'vertical',
    reverse: false,
    margin: {top: 50, right: 130, bottom: 50, left: 60},
    padding: 0.3,
};

export const chartSlice = createSlice({
    name: 'bar',
    initialState,
    reducers: {
        setPartialState: (state, action: PayloadAction<Partial<ChartState>>) => {
            Object.assign(state, action.payload);
        },
    },
});

export const {setPartialState} = chartSlice.actions;

export default chartSlice.reducer;
