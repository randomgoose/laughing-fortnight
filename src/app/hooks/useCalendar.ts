import {useImmerAtom} from 'jotai/immer';
import moment from 'moment';
import {calendaraAtomFamily} from '../atoms/calendarAtomFamily';

export function useCalendar(id: string) {
    const [calendar, setCalendar] = useImmerAtom(calendaraAtomFamily({id}));

    function getValueByDate(date: string) {
        const datum = calendar.data.find((datum) => moment(datum.day).isSame(date));
        if (datum) {
            return datum.value;
        } else {
            return 0;
        }
    }

    function changeValueByDate(date: string, value: number) {
        setCalendar((calendar) => {
            const datum = calendar.data.find((datum) => moment(datum.day).isSame(date));
            console.log(datum);

            if (datum) {
                datum.value = value;
            } else {
                calendar.data.push({day: date, value: value});
            }
        });
    }

    return {
        calendar,
        getValueByDate,
        setCalendar,
        changeValueByDate,
    };
}
