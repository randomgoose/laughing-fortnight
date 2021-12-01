import {ResponsiveCalendar} from '@nivo/calendar';
import {useImmerAtom} from 'jotai/immer';
import React from 'react';
import {Param} from '../../atoms/appAtom';
import {calendaraAtomFamily, CalendarState} from '../../atoms/calendarAtomFamily';
import {onDragStop, onResize} from '../../utils/rnd-util';
import StyledRnd from '../StyledComponents/StyledRnd';

export default function VisCalendar({id, initialState}: Param & {initialState?: CalendarState}) {
    const [calendar, setCalendar] = useImmerAtom(calendaraAtomFamily({id}));

    React.useEffect(() => {
        if (initialState)
            setCalendar((calendar) => {
                Object.assign(calendar, initialState);
            });
    }, []);

    return (
        <StyledRnd
            chartId={id}
            width={calendar.width}
            height={calendar.height}
            x={calendar.x}
            y={calendar.y}
            onResize={(e, direction, ref, delta, position) => onResize(e, direction, ref, delta, position, setCalendar)}
            onDragStop={(e, d) => onDragStop(e, d, setCalendar)}
        >
            <ResponsiveCalendar {...calendar} />
        </StyledRnd>
    );
}
