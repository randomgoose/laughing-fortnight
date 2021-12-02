import {PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, Popover} from '@chakra-ui/popover';
import {ResponsiveCalendar} from '@nivo/calendar';
import {useImmerAtom} from 'jotai/immer';
import React from 'react';
import {Param} from '../../atoms/appAtom';
import {calendaraAtomFamily, CalendarState} from '../../atoms/calendarAtomFamily';
import {onDragStop, onResize} from '../../utils/rnd-util';
import StyledRnd from '../StyledComponents/StyledRnd';

export default function VisCalendar({id, initialState}: Param & {initialState?: CalendarState}) {
    const [calendar, setCalendar] = useImmerAtom(calendaraAtomFamily({id}));
    const [position, setPosition] = React.useState({x: 0, y: 0});

    React.useEffect(() => {
        if (initialState)
            setCalendar((calendar) => {
                Object.assign(calendar, initialState);
            });
    }, []);

    React.useEffect(() => {
        console.log(position);
    }, [position]);

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
            <ResponsiveCalendar
                {...calendar}
                onClick={(datum, event) => {
                    setPosition({x: event.clientX, y: event.clientY});
                    console.log(datum);
                }}
            />
            <Popover
                returnFocusOnClose={false}
                isOpen={true}
                onClose={close}
                closeOnBlur={false}
                computePositionOnMount
            >
                <PopoverContent
                    top={position.y - calendar.y}
                    left={position.x - calendar.x}
                    position={'absolute'}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <PopoverHeader>awdwad</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                        <div>ssssawda</div>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </StyledRnd>
    );
}
