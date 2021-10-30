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
    scale: number;
    render: 'svg' | 'canvas';
    activeBar: string;
    activeIndex: number;
    activeDatum: ComputedBarDatum<BarDatum> & {
        color: string;
    };
}

type Param = {id: string};

export const barAtomFamily = atomFamily(
    (param: Param) =>
        atom({
            key: param.id,
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
            legends: baseLegend.map((legend) => ({...legend, dataFrom: 'keys'})),
            activeBar: '',
            activeIndex: -1,
            activeDatum: null,
            axisBottom: {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
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
        }),
    (a: Param, b: Param) => a.id === b.id
);
