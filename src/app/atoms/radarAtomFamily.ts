import {RadarSvgProps} from '@nivo/radar';
import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';
import {data} from '../data/baseRadarData';
import {Param} from './appAtom';

export interface RadarState extends RadarSvgProps<Record<string, unknown>> {
    width: number;
    height: number;
    x: number;
    y: number;
}

export const radarAtomFamily = atomFamily(
    (param: Param) =>
        atom({
            // Base
            key: param.id,
            data: data,
            indexBy: 'taste',
            keys: ['chardonay', 'carmenere', 'syrah'],
            x: 400,
            y: 100,
            height: 300,
            width: 400,
            maxValue: 'auto',
            valueFormat: '>-.2f',
            curve: 'linearClosed',
            margin: {top: 70, right: 80, bottom: 40, left: 80},
            // Style
            colors: {scheme: 'nivo'},
            fillOpacity: 0.25,
            blendMode: 'multiply',
            borderWidth: 2,
            borderColor: {from: 'color'},
            // Grid
            gridLevels: 5,
            gridShape: 'circular',
            gridLabelOffset: 16,
            // Dots
            enableDots: true,
            dotSize: 6,
            dotColor: {from: 'color'},
            dotBorderWidth: 2,
            dotBorderColor: {from: 'color'},
            enableDotLabel: false,
            dotLabel: 'formattedValue',
            dotLabelYOffset: -12,
            // Interactivity
            isInteractive: true,
            animate: true,
        } as RadarState),
    (a: Param, b: Param) => a.id === b.id
);
