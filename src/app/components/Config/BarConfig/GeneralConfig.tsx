import * as React from 'react';
import ConfigPage from '../ConfigPage';
import {FcSettings} from 'react-icons/fc';
import {Form, Radio, Select, Slider, Space, Switch} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setPartialState} from '../../../features/chart/barChartSlice';
import MarginInput from '../../CustomInput/MarginInput';
import {HighlightOutlined} from '@ant-design/icons';
import {colorSchemes} from '@nivo/colors';
import {useTranslation} from 'react-i18next';

const colorSchemeList = Object.keys(colorSchemes);

export default function GeneralConfig() {
    const {groupMode, layout, margin, padding, innerPadding, colors} = useSelector((state: RootState) => state.bar);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    return (
        <ConfigPage title={t('General')} icon={<FcSettings />}>
            <Form
                layout={'vertical'}
                initialValues={{
                    groupMode,
                    layout,
                    margin,
                    padding,
                    innerPadding,
                    colors: colors['scheme'],
                }}
                onValuesChange={(changedValues) => {
                    if (changedValues.colors) {
                        dispatch(setPartialState({colors: {scheme: changedValues.colors}}));
                    } else if (changedValues.xScale) {
                        dispatch(setPartialState({xScale: {type: changedValues.xScale}}));
                    } else if (changedValues.yScale) {
                        dispatch(setPartialState({yScale: {type: changedValues.yScale}}));
                    } else {
                        dispatch(setPartialState(changedValues));
                    }
                }}
            >
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
                <Form.Item
                    label={
                        <Space>
                            <HighlightOutlined />
                            {t('Colors')}
                        </Space>
                    }
                    name={'colors'}
                >
                    <Select style={{width: '100%'}}>
                        {colorSchemeList.map((scheme) => (
                            <Select.Option key={scheme} value={scheme}>
                                {scheme}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
