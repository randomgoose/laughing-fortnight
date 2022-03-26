import {BarSvgProps, BarDatum, ComputedBarDatum} from '@nivo/bar';
import {baseLegend} from '../data/baseLegend';
import {data} from '../data/baseBarData';
import {atomFamily} from 'jotai/utils';
import {atom} from 'jotai';
import _ from 'lodash';

export interface BarState extends BarSvgProps<BarDatum> {
    data: BarDatum[];
    showXAxis: boolean;
    showYAxis: boolean;
    enableGridX: boolean;
    enableGridY: boolean;
    width: number;
    height: number;
    x: number;
    y: number;
    render: 'svg' | 'canvas';
    activeBar: string;
    activeIndex: number;
    activeDatum: ComputedBarDatum<BarDatum> & {
        color: string;
    };
    colorSchemeId: string;
}

type Param = {id: string};

export const initialBarState = {
    // Base
    height: 300,
    width: 400,
    data: data,
    indexBy: 'id',
    keys: ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'],
    x: 400,
    y: 100,
    groupMode: 'grouped',
    layout: 'vertical',
    valueScale: {type: 'linear'},
    indexScale: {type: 'band', round: true},
    reverse: false,
    maxValue: 'auto',
    minValue: 'auto',
    padding: 0.3,
    innerPadding: 0.1,
    margin: {top: 50, right: 130, bottom: 50, left: 60},
    // Style
    colors: {scheme: 'nivo'},
    colorBy: 'id',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: {from: 'color'},
    // Labels
    enableLabel: true,
    label: 'formattedValue',
    labelSkipWidth: 4,
    labelSkipHeight: 0,
    labelTextColor: {from: 'theme', theme: 'labels.text.fill'},
    // Grid & Axes
    showXAxis: true,
    showYAxis: true,
    enableGridX: true,
    enableGridY: true,
    axisBottom: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'id',
        legendPosition: 'middle',
        legendOffset: 32,
    },
    axisLeft: {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
    },
    // Interactivity
    isInteractive: true,
    // Legends
    legends: baseLegend.map((legend) => ({...legend, dataFrom: 'keys'})),
    // Others
    render: 'svg',
    activeBar: '',
    activeIndex: -1,
    activeDatum: null,
    colorSchemeId: 'nivo',
};

export const barAtomFamily = atomFamily(
    (param: Param) => atom({key: param.id, ...initialBarState}),
    (a: Param, b: Param) => a.id === b.id
);
