import {BarSvgProps, BarDatum} from '@nivo/bar';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {data} from '../../data/baseBarData';
import _ from 'lodash';

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
    render: 'svg' | 'canvas';
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
    indexBy: 'country',
    innerPadding: 0.1,
    maxValue: 'auto',
    minValue: 'auto',
    borderColor: {from: 'color'},
    borderRadius: 0,
    borderWidth: 0,
    label: 'formattedValue',
    enableLabel: true,
    valueScale: {type: 'linear'},
    indexScale: {type: 'band', round: true},
    labelSkipWidth: 4,
    labelSkipHeight: 0,
    isInteractive: true,
    labelTextColor: {from: 'theme', theme: 'labels.text.fill'},
    colorBy: 'id',
    colors: {scheme: 'nivo'},
    render: 'svg',
};

export const chartSlice = createSlice({
    name: 'bar',
    initialState,
    reducers: {
        setPartialState: (state, action: PayloadAction<Partial<ChartState>>) => {
            Object.assign(state, action.payload);
        },
        setData: (state, action: PayloadAction<{index: number; key: string; value: number}>) => {
            const {index, key, value} = action.payload;
            state.data[index][key] = value;
        },
        setKey: (state, action: PayloadAction<{key: string; newKey: string}>) => {
            const {key, newKey} = action.payload;
            state.data.forEach((datum) => {
                datum[newKey] = datum[key];
                datum = _.omit(datum, [key]);
            });
            state.keys.splice(state.keys.indexOf(key), 1, newKey);
        },
        addKey: (state, action: PayloadAction<string>) => {
            state.data.forEach((datum) => (datum[action.payload] = Math.random()));
            state.keys.push(action.payload);
        },
        removeKey: (state, action: PayloadAction<string>) => {
            state.data.forEach((datum) => {
                datum = _.omit(datum, [action.payload]);
            });
            state.keys = state.keys.filter((key) => key !== action.payload);
        },
    },
});

export const {setPartialState, setData, setKey, addKey, removeKey} = chartSlice.actions;

export default chartSlice.reducer;
