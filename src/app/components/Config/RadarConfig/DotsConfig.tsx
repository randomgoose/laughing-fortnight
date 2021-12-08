import React from 'react';
import {useTranslation} from 'react-i18next';
import {FcOrgUnit} from 'react-icons/fc';
import {Param} from '../../../atoms/appAtom';
import useRadar from '../../../hooks/useRadar';
import ConfigPage from '../ConfigPage';
import {Form, Slider, Switch} from 'antd';

export default function DotsConfig({id}: Param) {
    const {radar, setPartialState} = useRadar(id);
    const {t} = useTranslation();

    return (
        <ConfigPage title={t('Style')} icon={<FcOrgUnit />}>
            <Form
                layout={'vertical'}
                initialValues={radar}
                onValuesChange={(changedValues) => setPartialState(changedValues)}
            >
                <Form.Item name={'enableDots'} label={t('Enable Dots')} valuePropName={'checked'}>
                    <Switch />
                </Form.Item>
                <Form.Item name={'dotSize'} label={t('Dot Size')}>
                    <Slider />
                </Form.Item>
                <Form.Item name={'dotBorderWidth'} label={t('Dot Border Width')}>
                    <Slider />
                </Form.Item>
                {/* <Form.Item name={'enableDotLabel'} label={t('Enable Dot Label')} valuePropName={'checked'}>
                <Switch />
            </Form.Item> */}
                <Form.Item name={'dotLabelYOffset'} label={t('Dot Label Y Offset')}>
                    <Slider min={-24} max={24} />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
