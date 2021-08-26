import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {data} from '../../data/baseData';
import {Serie, LineProps, LineSvgProps} from '@nivo/line';
import {OrdinalColorScaleConfig} from '@nivo/colors';
import {ColorSchemeId} from '@nivo/colors';
import {AxisProps} from '@nivo/axes';
import cryptoRandomString from 'crypto-random-string';
import {LegendProps} from '@nivo/legends';
export interface ChartState extends LineSvgProps {
    showXAxis: boolean;
    xAxisLabel: string;
    showYAxis: boolean;
    showLegend: boolean;
    showGridX: boolean;
    showGridY: boolean;
    colors: OrdinalColorScaleConfig;
    margin: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    data: Serie[];
    lines: Array<string | number>;
    activeSerie: string | number;
    scale: number;
}

const initialState: ChartState = {
    showXAxis: true,
    xAxisLabel: '',
    showYAxis: true,
    showLegend: true,
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],
    colors: {scheme: 'nivo'},
    margin: {top: 50, right: 110, bottom: 50, left: 60},
    data: data,
    lines: data.map((item) => item.id),
    showGridX: true,
    showGridY: true,
    activeSerie: '',
    scale: 1,
    enableArea: true,
    curve: 'linear',
    enablePoints: true,
    pointSize: 8,
    axisBottom: {
        legend: 'x 轴',
        legendPosition: 'middle',
        tickRotation: 0,
        legendOffset: 24,
        tickPadding: 0,
    },
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
        addKey: (state, action: PayloadAction<string | number>) => {
            state.lines = [...state.lines, action.payload];
        },
        removeKey: (state, action: PayloadAction<string | number>) => {
            state.lines = state.lines.filter((item) => item !== action.payload);
        },
        setShowGridX: (state, action: PayloadAction<boolean>) => {
            state.showGridX = action.payload;
        },
        setShowGridY: (state, action: PayloadAction<boolean>) => {
            state.showGridY = action.payload;
        },
        setSerieId: (state, action: PayloadAction<{id: string | number; newId: string | number}>) => {
            const {id, newId} = action.payload;
            state.data.find((serie) => serie.id === id).id = newId;
            state.lines.push(newId);
        },
        setMargin: (
            state,
            action: PayloadAction<Partial<{left: number; right: number; top: number; bottom: number}>>
        ) => {
            state.margin = Object.assign(state.margin, action.payload);
        },
        setData: (
            state,
            action: PayloadAction<{serieIndex: number; datumIndex: number; key: string; value: number}>
        ) => {
            const {serieIndex, datumIndex, key, value} = action.payload;
            state.data[serieIndex]['data'][datumIndex][key] = value;
        },
        setNewData: (state, action: PayloadAction<ChartState['data']>) => {
            state.data = action.payload;
            state.lines = action.payload
                .filter((serie) => serie.data.filter((datum) => isNaN(parseFloat(datum.y as string))).length === 0)
                .map((serie) => serie.id);
        },
        setActiveSerie: (state, action: PayloadAction<string | number>) => {
            state.activeSerie = action.payload;
        },
        setScale: (state, action: PayloadAction<number>) => {
            state.scale = action.payload;
        },
        setColorScheme: (state, action: PayloadAction<ColorSchemeId>) => {
            state.colors = {scheme: action.payload};
        },
        setCurve: (state, action: PayloadAction<LineProps['curve']>) => {
            state.curve = action.payload;
        },
        setEnablePoints: (state, action: PayloadAction<boolean>) => {
            state.enablePoints = action.payload;
        },
        setLineWidth: (state, action: PayloadAction<number>) => {
            state.lineWidth = action.payload;
        },
        setPointSize: (state, action: PayloadAction<number>) => {
            state.pointSize = action.payload;
        },
        addValue: (state, action: PayloadAction<string | number>) => {
            state.data
                .find((datum) => (datum.id = action.payload))
                .data.push({x: cryptoRandomString({length: 4}), y: 100});
        },
        setAxis: (
            state,
            action: PayloadAction<{
                which: 'axisBottom' | 'axisLeft' | 'axisTop' | 'axisRight';
                props: Partial<AxisProps>;
            }>
        ) => {
            const {which, props} = action.payload;
            !state[which] ? (state[which] = props) : Object.assign(state[which], props);
        },
        setPartialState: (state, action: PayloadAction<Partial<ChartState>>) => {
            Object.assign(state, action.payload);
        },
        setLegend: (state, action: PayloadAction<{index: number; newLegend: LegendProps}>) => {
            const {index, newLegend} = action.payload;
            Object.assign(state.legends[index], newLegend);
        },
        removeLegendByIndex: (state, action: PayloadAction<number>) => {
            // console.log([...state.legends.slice(0, action.payload), ...state.legends.slice(action.payload)]);
            state.legends = state.legends.filter((_legend, index) => index !== action.payload);
            // state.legends = [...state.legends.slice(0, action.payload), ...state.legends.slice(action.payload)];
        },
    },
});

export const {
    setShowXAxis,
    setShowYAxis,
    setShowLegend,
    setMargin,
    setXAxisLabel,
    addKey,
    removeKey,
    setData,
    setShowGridX,
    setShowGridY,
    setActiveSerie,
    setNewData,
    setScale,
    loadState,
    setColorScheme,
    setCurve,
    setLineWidth,
    setSerieId,
    setPointSize,
    setEnablePoints,
    addValue,
    setAxis,
    setPartialState,
    setLegend,
    removeLegendByIndex,
} = chartSlice.actions;

export default chartSlice.reducer;
