import {useAtom} from 'jotai';
import {useTranslation} from 'react-i18next';
import {FcSettings} from 'react-icons/fc';
import {Param} from '../../../atoms/appAtom';
import {calendaraAtomFamily} from '../../../atoms/calendarAtomFamily';
import ConfigPage from '../ConfigPage';
import React from 'react';
import {Form, DatePicker, Radio} from 'antd';
import moment from 'moment';
import MarginInput from '../../CustomInput/MarginInput';
import Anchor from '../../CustomInput/Anchor';
import {Input} from '@chakra-ui/input';

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
                initialValues={{...calendar, from: moment(calendar.from), to: moment(calendar.to)}}
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
                <Form.Item name={'direction'} label={t('Direction')}>
                    <Radio.Group
                        optionType={'button'}
                        options={[
                            {value: 'horizontal', label: t('Horizontal')},
                            {value: 'vertical', label: t('Vertical')},
                        ]}
                    />
                </Form.Item>
                <Form.Item name={'margin'} label={t('Margin')}>
                    <MarginInput />
                </Form.Item>
                <Form.Item name={'align'} label={t('Align')}>
                    <Anchor />
                </Form.Item>
            </Form>
            <div className={'mb-2'}>{t('Range of values')}</div>
            <div className={'flex gap-2'}>
                <div className={'flex flex-col justify-between items-end w-1/2'}>
                    <Input size={'sm'} value={calendar.maxValue} />
                    <Input size={'sm'} value={calendar.minValue} />
                    {/* <div>{calendar.maxValue}</div>
                    <div>{calendar.minValue}</div> */}
                </div>
                <div className={'flex flex-col-reverse w-1/2'}>
                    {calendar.colors?.map((color, index) => (
                        <div key={index} className={'w-full h-9'} style={{background: color}}></div>
                    ))}
                </div>
            </div>
        </ConfigPage>
    );
}
