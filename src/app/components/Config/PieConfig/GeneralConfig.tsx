import * as React from 'react';
import {Form, Select, Slider, Switch} from 'antd';
import {useTranslation} from 'react-i18next';
import {FcSettings} from 'react-icons/fc';
import ConfigPage from '../ConfigPage';
import MarginInput from '../../CustomInput/MarginInput';
import {colorSchemes} from '@nivo/colors';
import ColorSchemeSelector from '../../color-scheme-selector';

const colorSchemeList = Object.keys(colorSchemes);

export default function GeneralConfig() {
    const {t} = useTranslation();

    return (
        <ConfigPage title={t('General')} icon={<FcSettings />}>
            <Form.Item name={'innerRadius'} label={t('Inner Radius')}>
                <Slider min={0} max={1} step={0.01} />
            </Form.Item>
            <Form.Item name={'startAngle'} label={t('Start Angle')}>
                <Slider min={-180} max={360} step={1} />
            </Form.Item>
            <Form.Item name={'endAngle'} label={t('End Angle')}>
                <Slider min={-180} max={360} step={1} />
            </Form.Item>
            <Form.Item name={'sortByValue'} label={t('Sort by Value')} valuePropName={'checked'}>
                <Switch />
            </Form.Item>
            <Form.Item name={['colors', 'scheme']} label={t('Colors')}>
                <Select style={{width: '100%'}}>
                    {colorSchemeList.map((scheme) => (
                        <Select.Option key={scheme} value={scheme}>
                            {scheme}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name={'margin'} label={t('Margin')}>
                <MarginInput />
            </Form.Item>
            <ColorSchemeSelector />
        </ConfigPage>
    );
}
