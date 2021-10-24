import {DefaultRawDatum, PieSvgProps} from '@nivo/pie';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {data} from '../../data/basePieData';

export interface PieChartState extends PieSvgProps<DefaultRawDatum> {
    data: DefaultRawDatum[];
    x: number;
    y: number;
    scale: number;
}

const initialState: PieChartState = {
    data: data,
    width: 400,
    height: 300,
    margin: {top: 40, right: 80, bottom: 80, left: 80},
    x: 400,
    y: 100,
    scale: 1,
    startAngle: 0,
    endAngle: 360,
};

export const pieChartSlice = createSlice({
    name: 'pie',
    initialState,
    reducers: {
        setPartialState: (state, action: PayloadAction<Partial<PieChartState>>) => {
            Object.assign(state, action.payload);
        },
    },
});

export const {setPartialState} = pieChartSlice.actions;

export default pieChartSlice.reducer;
