import {useDisclosure} from '@chakra-ui/hooks';
import {Heading} from '@chakra-ui/layout';
import {NumberInput, NumberInputField} from '@chakra-ui/number-input';
import {Portal} from '@chakra-ui/portal';
import {Datum, ResponsiveCalendar} from '@nivo/calendar';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Param} from '../../atoms/appAtom';
import {CalendarState} from '../../atoms/calendarAtomFamily';
import {useCalendar} from '../../hooks/useCalendar';
import {onDragStop, onResize} from '../../utils/rnd-util';
import Widget from '../../widgets/Widget';
import StyledRnd from '../StyledComponents/StyledRnd';

export default function VisCalendar({id, initialState}: Param & {initialState?: CalendarState}) {
    const {calendar, setCalendar, getValueByDate, changeValueByDate} = useCalendar(id);
    const [position, setPosition] = React.useState({x: 0, y: 0});
    const [activeDate, setActiveDate] = React.useState<Datum | Omit<Datum, 'data' | 'value'> | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {t} = useTranslation();

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
            // onMouseDown={() => {
            //     onClose()
            // }}
        >
            <ResponsiveCalendar
                {...calendar}
                onClick={(datum, event) => {
                    setPosition({x: event.clientX, y: event.clientY});
                    setActiveDate(datum);
                    onOpen();
                }}
            />
            {activeDate ? (
                <Portal>
                    <Widget
                        onClose={onClose}
                        position={position}
                        isOpen={isOpen}
                        content={
                            <div>
                                <div>
                                    <Heading as={'h6'} size={'xs'}>
                                        {t('Value')}
                                    </Heading>
                                    <NumberInput
                                        size={'sm'}
                                        value={getValueByDate(activeDate.day)}
                                        onKeyDown={(e) => e.stopPropagation()}
                                        onChange={(_valueAsString, valueAsNumber) =>
                                            changeValueByDate(activeDate.day, valueAsNumber)
                                        }
                                    >
                                        <NumberInputField />
                                    </NumberInput>
                                </div>
                            </div>
                        }
                        title={`${t('Date')}: ${activeDate && activeDate.day}`}
                    />
                </Portal>
            ) : null}
        </StyledRnd>
    );
}
