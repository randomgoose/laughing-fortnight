import {BarState} from './barAtomFamily';
import {CalendarState} from './calendarAtomFamily';
import {LineState} from './lineAtomFamily';
import {PieState} from './pieAtomFamily';
import {RadarState} from './radarAtomFamily';
import {ScatterState} from './scatterAtomFamily';

export type ChartStateType = BarState | LineState | CalendarState | PieState | ScatterState | RadarState;
