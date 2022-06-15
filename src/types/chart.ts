import {BarState} from '../app/atoms/barAtomFamily';
import {CalendarState} from '../app/atoms/calendarAtomFamily';
import {LineState} from '../app/atoms/lineAtomFamily';
import {PieState} from '../app/atoms/pieAtomFamily';
import {RadarState} from '../app/atoms/radarAtomFamily';
import {ScatterState} from '../app/atoms/scatterAtomFamily';

export type ChartState = BarState | PieState | LineState | RadarState | ScatterState | CalendarState;
export type ChartType = 'LINE' | 'PIE' | 'BAR' | 'SCATTER' | 'RADAR' | 'CALENDAR';

export type Dimension = {
    width: number;
    height: number;
};

export type AxisProps = {
    showXAxis: boolean;
    showYAxis: boolean;
};
