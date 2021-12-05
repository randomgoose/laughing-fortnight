import React from 'react';
import {Calendar, InputNumber} from 'antd';
import {Param} from '../../../atoms/appAtom';
import {useCalendar} from '../../../hooks/useCalendar';
import moment from 'moment';

export default function CalendarDataTable({id}: Param) {
    const {
        calendar: {from, to},
        getValueByDate,
        changeValueByDate,
    } = useCalendar(id);
    return (
        <Calendar
            validRange={[moment(from), moment(to)]}
            defaultValue={moment(from)}
            dateCellRender={(date) => (
                <InputNumber value={getValueByDate(date)} onChange={(value) => changeValueByDate(date, value)} />
            )}
        />
    );
}
