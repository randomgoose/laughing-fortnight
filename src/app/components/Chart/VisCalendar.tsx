import {useDisclosure} from '@chakra-ui/hooks';
import {Heading} from '@chakra-ui/layout';
import {NumberInput, NumberInputField} from '@chakra-ui/number-input';
import {Portal} from '@chakra-ui/portal';
import {Datum, ResponsiveCalendar} from '@nivo/calendar';
import {PrimitiveAtom, useAtom} from 'jotai';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {CalendarState} from '../../atoms/calendarAtomFamily';
import {useCalendar} from '../../hooks/useCalendar';
import Widget from '../../widgets/Widget';

export default function VisCalendar({
    initialState,
    atom,
}: {
    initialState?: CalendarState;
    atom: PrimitiveAtom<CalendarState>;
}) {
    const [calendar] = useAtom(atom);
    const {setCalendar, getValueByDate, changeValueByDate} = useCalendar(calendar.key);
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
        <>
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
        </>
    );
}
