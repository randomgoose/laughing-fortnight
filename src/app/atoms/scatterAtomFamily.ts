import {atomFamily} from 'jotai/utils';
import {atom} from 'jotai';
import {ScatterPlotDatum, ScatterPlotRawSerie, ScatterPlotSvgProps} from '@nivo/scatterplot';
import {baseData} from '../data/baseScatterData';
import {baseLegend} from '../data/baseLegend';

export interface ScatterState extends ScatterPlotSvgProps<ScatterPlotDatum> {
    id: string;
    data: ScatterPlotRawSerie<ScatterPlotDatum>[];
    x: number;
    y: number;
    enableXAxis: boolean;
    enableYAxis: boolean;
    scale: number;
    render: 'svg' | 'canvas';
}

type Param = {id: string};

export const scatterAtomFamily = atomFamily(
    (param: Param) =>
        atom({
            // Base
            id: param.id,
            xScale: {type: 'linear', min: 'auto', max: 'auto'},
            yScale: {type: 'linear', min: 'auto', max: 'auto'},
            nodeSize: 9,
            width: 400,
            height: 300,
            x: 400,
            y: 100,
            margin: {top: 60, right: 140, bottom: 70, left: 90},
            data: baseData,
            // Style
            colors: {scheme: 'nivo'},
            blendMode: 'multiply',
            // Grid && Axes
            enableXAxis: true,
            enableYAxis: true,
            enableGridX: true,
            enableGridY: true,
            axisBottom: {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'weight',
                legendPosition: 'middle',
                legendOffset: 46,
            },
            axisLeft: {
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'size',
                legendPosition: 'middle',
                legendOffset: -60,
            },
            legends: [...baseLegend],
            isInteractive: true,
        } as ScatterState),
    (a: Param, b: Param) => a.id === b.id
);
