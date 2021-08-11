import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {data} from '../../data/baseData';
import {generateRandomHexColor} from '../../utils/generateRandomHexColor';

export interface ILine {
    key: string;
    color: string;
    curveType: string;
}

const lines: ILine[] = [];
Object.keys(data[0]).forEach((key) => {
    if (key !== 'name') {
        lines.push({
            key,
            color: generateRandomHexColor(),
            curveType: 'monotone',
        });
    }
});

export interface ChartState {
    showXAxis: boolean;
    xAxisLabel: string;
    showYAxis: boolean;
    showLegend: boolean;
    showCartesianGrid: boolean;
    legendLayout: 'horizontal' | 'vertical';
    legendAlign: 'left' | 'center' | 'right';
    legendVerticalAlign: 'top' | 'middle' | 'bottom';
    margin: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    data: Object[];
    lines: ILine[];
    activeKey: string;
    scale: number;
}

const initialState: ChartState = {
    showXAxis: true,
    xAxisLabel: '',
    showYAxis: true,
    showLegend: true,
    legendLayout: 'horizontal',
    legendAlign: 'left',
    legendVerticalAlign: 'bottom',
    margin: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    data: data,
    lines: lines,
    showCartesianGrid: true,
    activeKey: '',
    scale: 1,
};

export const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        loadState: (_state, action: PayloadAction<ChartState>) => {
            return action.payload;
        },
        setShowXAxis: (state, action: PayloadAction<boolean>) => {
            state.showXAxis = action.payload;
        },
        setXAxisLabel: (state, action: PayloadAction<string>) => {
            state.xAxisLabel = action.payload;
        },
        setShowYAxis: (state, action: PayloadAction<boolean>) => {
            state.showYAxis = action.payload;
        },
        setShowLegend: (state, action: PayloadAction<boolean>) => {
            state.showLegend = action.payload;
        },
        addKey: (state, action: PayloadAction<ILine>) => {
            state.lines = [...state.lines, action.payload];
        },
        removeKey: (state, action: PayloadAction<string>) => {
            state.lines = state.lines.filter((item) => item.key !== action.payload);
        },
        setLegendLayout: (state, action: PayloadAction<'vertical' | 'horizontal'>) => {
            state.legendLayout = action.payload;
        },
        setMargin: (
            state,
            action: PayloadAction<Partial<{left: number; right: number; top: number; bottom: number}>>
        ) => {
            state.margin = Object.assign(state.margin, action.payload);
        },
        setData: (state, action: PayloadAction<{index: number; key: string; newValue: number}>) => {
            const {index, key, newValue} = action.payload;
            state.data[index] = {...state.data[index], [key]: newValue};
        },
        setNewData: (state, action: PayloadAction<ChartState['data']>) => {
            state.data = action.payload;
        },
        setShowCartesianGrid: (state, action: PayloadAction<boolean>) => {
            state.showCartesianGrid = action.payload;
        },
        setActiveKey: (state, action: PayloadAction<string>) => {
            state.activeKey = action.payload;
        },
        setLines: (state, action: PayloadAction<{key: string; line: Partial<ILine>}>) => {
            Object.assign(
                state.lines.find((line) => line.key === action.payload.key),
                action.payload.line
            );
        },
        setScale: (state, action: PayloadAction<number>) => {
            state.scale = action.payload;
        },
        setLegendAlign: (state, action: PayloadAction<'left' | 'center' | 'right'>) => {
            state.legendAlign = action.payload;
        },
        setLegendVerticalAlign: (state, action: PayloadAction<'top' | 'middle' | 'bottom'>) => {
            state.legendVerticalAlign = action.payload;
        },
    },
});

export const {
    setShowXAxis,
    setShowYAxis,
    setShowLegend,
    setMargin,
    setLegendLayout,
    setXAxisLabel,
    addKey,
    removeKey,
    setData,
    setShowCartesianGrid,
    setActiveKey,
    setLines,
    setNewData,
    setScale,
    setLegendAlign,
    setLegendVerticalAlign,
    loadState,
} = chartSlice.actions;

export default chartSlice.reducer;
