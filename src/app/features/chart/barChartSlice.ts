import {BarDatum, BarSvgProps} from '@nivo/bar';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {data} from '../../data/baseBarData';

export interface ChartState extends BarSvgProps<BarDatum> {
    data: BarDatum[];
    showXAxis: boolean;
    showYAxis: boolean;
    enableGridX: boolean;
    enableGridY: boolean;
    width: number;
    height: number;
    x: number;
    y: number;
    scale: 1;
}

const initialState: ChartState = {
    height: 300,
    width: 400,
    data: data,
    groupMode: 'grouped',
    layout: 'vertical',
    reverse: false,
    margin: {top: 50, right: 130, bottom: 50, left: 60},
    padding: 0.3,
    showXAxis: true,
    showYAxis: true,
    enableGridX: true,
    enableGridY: true,
    keys: ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'],
    x: 400,
    y: 100,
    scale: 1,
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
