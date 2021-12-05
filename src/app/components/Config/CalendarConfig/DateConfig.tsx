import ConfigPage from '../ConfigPage';
import React from 'react';
import {Param} from '../../../atoms/appAtom';
import {Form, Radio, Slider} from 'antd';
import {useTranslation} from 'react-i18next';
import {FcCalendar} from 'react-icons/fc';
import {useCalendar} from '../../../hooks/useCalendar';
import {Heading} from '@chakra-ui/layout';

export default function DateConfig({id}: Param) {
    const {t} = useTranslation();
    const {calendar, setCalendar} = useCalendar(id);
    console.log(calendar);

    return (
        <ConfigPage title={t('Date')} icon={<FcCalendar />}>
            <Form
                initialValues={calendar}
                onValuesChange={(changedValues) =>
                    setCalendar((draftState) => {
                        Object.assign(draftState, changedValues);
                    })
                }
                layout={'vertical'}
            >
                <Heading as={'h6'}>{t('Year')}</Heading>
                <Form.Item name={'yearSpacing'} label={t('Year Spacing')}>
                    <Slider />
                </Form.Item>
                <Form.Item name={'yearLegendPosition'} label={t('Year Legend Position')}>
                    <Radio.Group
                        optionType={'button'}
                        options={[
                            {value: 'before', label: t('Before')},
                            {value: 'after', label: t('After')},
                        ]}
                    ></Radio.Group>
                </Form.Item>
                <Form.Item name={'yearLegendOffset'} label={t('Year Legend Offset')}>
                    <Slider />
                </Form.Item>
                <Heading as={'h6'}>{t('Month')}</Heading>
                <Form.Item name={'monthSpacing'} label={t('Month Spacing')}>
                    <Slider />
                </Form.Item>
                <Form.Item name={'monthLegendPosition'} label={t('Month Legend Position')}>
                    <Radio.Group
                        optionType={'button'}
                        options={[
                            {value: 'before', label: t('Before')},
                            {value: 'after', label: t('After')},
                        ]}
                    ></Radio.Group>
                </Form.Item>
                <Form.Item name={'monthLegendOffset'} label={t('Month Legend Offset')}>
                    <Slider />
                </Form.Item>
                <Heading as={'h6'}>{t('Day')}</Heading>
                <Form.Item name={'daySpacing'} label={t('Day Spacing')}>
                    <Slider />
                </Form.Item>
                <Form.Item name={'dayBorderWidth'} label={t('Day Border Width')}>
                    <Slider />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
