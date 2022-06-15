import * as React from 'react';
import ConfigPage from '../ConfigPage';
import {FcSettings} from 'react-icons/fc';
import {Form, Radio, Select, Slider, Switch} from 'antd';
import MarginInput from '../../CustomInput/MarginInput';
import {useTranslation} from 'react-i18next';
import ColorSchemeSelector from '../../color-scheme-selector';

const valueScaleType = ['linear', 'symlog'];
const indexScaleType = ['band'];

export default function GeneralConfig() {
    const {t} = useTranslation();

    return (
        <ConfigPage title={t('General')} icon={<FcSettings />}>
            <Form.Item name={['indexScale', 'type']} label={'Index Scale'}>
                <Select
                    options={indexScaleType.map((type) => ({
                        title: type,
                        value: type,
                    }))}
                ></Select>
            </Form.Item>
            <Form.Item name={['valueScale', 'type']} label={'Value Scale'}>
                <Select
                    options={valueScaleType.map((type) => ({
                        title: type,
                        value: type,
                    }))}
                ></Select>
            </Form.Item>
            <Form.Item name="groupMode" label={t('Group Mode')}>
                <Radio.Group
                    options={[
                        {
                            value: 'grouped',
                            label: t('Grouped'),
                        },
                        {value: 'stacked', label: t('Stacked')},
                    ]}
                    optionType={'button'}
                />
            </Form.Item>
            <Form.Item name="layout" label={t('Layout')}>
                <Radio.Group
                    options={[
                        {
                            value: 'horizontal',
                            label: t('Horizontal'),
                        },
                        {value: 'vertical', label: t('Vertical')},
                    ]}
                    optionType={'button'}
                />
            </Form.Item>
            <Form.Item name="reverse" valuePropName={'checked'} label={t('Reverse')}>
                <Switch />
            </Form.Item>
            <Form.Item name="padding" label={t('Padding')}>
                <Slider min={0.1} max={0.9} step={0.1} />
            </Form.Item>
            <Form.Item name="innerPadding" label={t('Inner Padding')}>
                <Slider step={1} max={9} />
            </Form.Item>
            <Form.Item name="margin" label={t('Margin')}>
                <MarginInput />
            </Form.Item>
            <ColorSchemeSelector />
        </ConfigPage>
    );
}
