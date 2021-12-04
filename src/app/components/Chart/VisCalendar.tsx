import {useDisclosure} from '@chakra-ui/hooks';
import {Input} from '@chakra-ui/input';
import {Portal} from '@chakra-ui/portal';
import {Datum, ResponsiveCalendar} from '@nivo/calendar';
import {useImmerAtom} from 'jotai/immer';
import React from 'react';
import {Param} from '../../atoms/appAtom';
import {calendaraAtomFamily, CalendarState} from '../../atoms/calendarAtomFamily';
import {onDragStop, onResize} from '../../utils/rnd-util';
import Widget from '../../widgets/Widget';
import StyledRnd from '../StyledComponents/StyledRnd';

export default function VisCalendar({id, initialState}: Param & {initialState?: CalendarState}) {
    const [calendar, setCalendar] = useImmerAtom(calendaraAtomFamily({id}));
    const [position, setPosition] = React.useState({x: 0, y: 0});
    const [activeDate, setActiveDate] = React.useState<Datum | Omit<Datum, 'data' | 'value'>>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

    React.useEffect(() => {
        console.log(activeDate);
    }, [activeDate]);

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
            onMouseDown={() => {
                onClose();
            }}
        >
            <ResponsiveCalendar
                {...calendar}
                onClick={(datum, event) => {
                    setPosition({x: event.clientX, y: event.clientY});
                    setActiveDate(datum);
                    onOpen();
                }}
            />
            <Portal>
                <Widget
                    position={position}
                    isOpen={isOpen}
                    content={
                        activeDate ? (
                            <div>
                                {activeDate.day}
                                <Input
                                    defaultValue={'value' in activeDate && activeDate.value}
                                    onKeyDown={(e) => e.stopPropagation()}
                                />
                            </div>
                        ) : null
                    }
                    title={'hi'}
                />
            </Portal>
        </StyledRnd>
    );
}
