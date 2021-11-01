import * as React from 'react';
import {Form, Slider, Switch} from 'antd';
import {useTranslation} from 'react-i18next';
import {FcPieChart} from 'react-icons/fc';
import ConfigPage from '../ConfigPage';
import {useAtom} from 'jotai';
import {pieAtomFamily} from '../../../atoms/pieAtomFamily';
import {Param} from '../../../atoms/appAtom';

export default function ArcConfig({id}: Param) {
    const {t} = useTranslation();
    const [pie, setPie] = useAtom(pieAtomFamily({id}));

    return (
        <ConfigPage title={t('Arc')} icon={<FcPieChart />}>
            <Form
                layout={'vertical'}
                initialValues={pie}
                onValuesChange={(changedValues) => setPie({...pie, ...changedValues})}
            >
                <Form.Item name={'enableArcLabels'} label={t('Enable arc labels')} valuePropName={'checked'}>
                    <Switch />
                </Form.Item>
                <Form.Item name={'arcLabelsRadiusOffset'} label={t('Arc labels radius offset')}>
                    <Slider min={0} max={2} step={0.1} />
                </Form.Item>
                <Form.Item name={'arcLabelsSkipAngle'} label={t('Arc labels skip angle')}>
                    <Slider min={0} max={45} step={1} />
                </Form.Item>
                <Form.Item name={'padAngle'} label={t('Pad Angle')}>
                    <Slider min={0} max={45} step={1} />
                </Form.Item>
                <Form.Item name={'sortByValue'} label={t('Sort by Value')} valuePropName={'checked'}>
                    <Switch />
                </Form.Item>
                <Form.Item name={'cornerRadius'} label={t('Corner Radius')}>
                    <Slider />
                </Form.Item>
                <Form.Item name={'activeOuterRadiusOffset'} label={t('Active outer radius offset')}>
                    <Slider />
                </Form.Item>
                <Form.Item name={'activeInnerRadiusOffset'} label={t('Active inner radius offset')}>
                    <Slider />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
