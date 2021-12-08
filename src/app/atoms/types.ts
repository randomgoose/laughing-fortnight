import {BarState} from './barAtomFamily';
import {CalendarState} from './calendarAtomFamily';
import {LineState} from './lineAtomFamily';
import {PieState} from './pieAtomFamily';
import {RadarState} from './radarAtomFamily';
import {ScatterState} from './scatterAtomFamily';

export type ChartStateType = BarState | LineState | CalendarState | PieState | ScatterState | RadarState;
export const blendModeList = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
];
