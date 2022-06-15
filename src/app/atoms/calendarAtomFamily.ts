import {CalendarSvgProps} from '@nivo/calendar';
import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';
import {Param} from './appAtom';
import {baseCalendarData} from '../data/baseCalendarData';

export interface CalendarState extends CalendarSvgProps {
    readonly type: 'CALENDAR';
    key: string;
    width: number;
    height: number;
    x: number;
    y: number;
}

const initialState: CalendarState = {
    /**
     * Base
     */
    type: 'CALENDAR',
    key: '',
    data: baseCalendarData,
    x: 400,
    y: 100,
    from: '2015-03-01',
    to: '2016-07-12',
    width: 800,
    height: 400,
    direction: 'horizontal',
    margin: {top: 40, left: 40, right: 40, bottom: 40},
    align: 'center',
    minValue: 0,
    maxValue: 'auto',
    /**
     * Style
     */
    colors: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
    emptyColor: '#eeeeee',
    /**
     * Years
     */
    yearSpacing: 40,
    yearLegendPosition: 'before',
    yearLegendOffset: 10,
    /**
     * Months
     */
    monthSpacing: 0,
    monthBorderWidth: 2,
    monthBorderColor: '#ffffff',
    monthLegendPosition: 'before',
    monthLegendOffset: 10,
    /**
     * Days
     */
    daySpacing: 0,
    dayBorderWidth: 1,
    dayBorderColor: '#ffffff',
};

export const calendaraAtomFamily = atomFamily(
    (param: Param) =>
        atom({
            ...initialState,
            key: param.id,
        }),
    (a: Param, b: Param) => a.id === b.id
);
