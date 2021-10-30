import {baseLegend} from '../data/baseLegend';
import {data} from '../data/baseLineData';
import {atomFamily} from 'jotai/utils';
import {atom} from 'jotai';
import _ from 'lodash';
import {LineSvgProps} from '@nivo/line';

export interface LineState extends LineSvgProps {
    width: number;
    height: number;
    x: number;
    y: number;
    showXAxis: boolean;
    xAxisLabel: string;
    showYAxis: boolean;
    showLegend: boolean;
    lines: Array<string | number>;
    activeSerie: string | number;
    scale: number;
    render: 'svg' | 'canvas';
}

type Param = {id: string};

export const lineAtomFamily = atomFamily(
    (param: Param) =>
        atom({
            key: param.id,
            x: 400,
            y: 100,
            scale: 1,
            // Base
            xScale: {type: 'point'},
            yScale: {type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false},
            width: 400,
            height: 150,
            margin: {top: 50, right: 110, bottom: 50, left: 60},
            // Style
            curve: 'linear',
            lineWidth: 2,
            enableArea: true,
            areaBaselineValue: 0,
            areaOpacity: 0.2,
            areaBlendMode: 'normal',
            // Points
            enablePoints: true,
            pointSize: 8,
            pointColor: {from: 'color'},
            pointBorderWidth: 2,
            pointBorderColor: {theme: 'background'},
            enablePointLabel: false,
            pointLabel: 'yFormatted',
            pointLabelYOffset: -12,
            // Grid & Axes
            enableGridX: true,
            enableGridY: true,
            showXAxis: true,
            showYAxis: true,

            xAxisLabel: '',
            showLegend: true,
            legends: baseLegend,
            colors: {scheme: 'nivo'},
            data: data,
            lines: data.map((item) => item.id),
            showGridX: true,
            showGridY: true,
            activeSerie: '',
            axisBottom: {
                legend: 'xAxis',
                legendPosition: 'middle',
                tickRotation: 0,
                legendOffset: 24,
                tickPadding: 0,
            },
            axisLeft: {
                legend: 'yAxis',
            },
            render: 'svg',
        }),
    (a: Param, b: Param) => a.id === b.id
);
