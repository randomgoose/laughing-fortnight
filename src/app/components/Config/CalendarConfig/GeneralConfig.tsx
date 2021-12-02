import {useAtom} from 'jotai';
import {useTranslation} from 'react-i18next';
import {FcSettings} from 'react-icons/fc';
import {Param} from '../../../atoms/appAtom';
import {calendaraAtomFamily} from '../../../atoms/calendarAtomFamily';
import ConfigPage from '../ConfigPage';
import React from 'react';
import {Form, DatePicker} from 'antd';
import moment from 'moment';

export default function GeneralConfig({id}: Param) {
    const {t} = useTranslation();
    const [calendar, setCalendar] = useAtom(calendaraAtomFamily({id}));

    React.useEffect(() => {
        console.log(calendar);
    }, [calendar]);

    return (
        <ConfigPage title={t('General')} icon={<FcSettings />}>
            <Form
                layout={'vertical'}
                initialValues={{from: moment(calendar.from)}}
                onValuesChange={(changedValues) => {
                    if (changedValues['from']) {
                        setCalendar({...calendar, from: changedValues['from'].format('YYYY-MM-DD')});
                    } else if (changedValues['to']) {
                        setCalendar({...calendar, to: changedValues['to'].format('YYYY-MM-DD')});
                    } else {
                        setCalendar({...calendar, ...changedValues});
                    }
                }}
            >
                <Form.Item name={'from'} label={t('From')}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name={'to'} label={t('To')}>
                    <DatePicker />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
