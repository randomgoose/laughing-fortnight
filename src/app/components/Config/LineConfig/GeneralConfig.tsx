import * as React from 'react';
import {Space, Slider, Select, Form, Switch, Typography} from 'antd';
import MarginInput from '../../CustomInput/MarginInput';
import {AreaChartOutlined, ColumnWidthOutlined} from '@ant-design/icons';
import {FcSettings} from 'react-icons/fc';
import * as _ from 'lodash';
import {useTranslation} from 'react-i18next';
import {blendModeList} from '../../../atoms/types';
import ColorSchemeSelector from '../../color-scheme-selector';

const scaleTypes = ['linear', 'point'];

export default function GeneralConfig({max}: {max: number}) {
    const {t} = useTranslation();

    return (
        <>
            <Typography.Title level={5}>
                <Space align={'center'} size={4}>
                    <FcSettings />
                    {t('General')}
                </Space>
            </Typography.Title>
            <Form.Item name={['xScale', 'type']} label={'xScale'}>
                <Select
                    options={scaleTypes.map((type) => ({
                        title: type,
                        value: type,
                    }))}
                ></Select>
            </Form.Item>
            <Form.Item name={['yScale', 'type']} label={'yScale'}>
                <Select
                    options={scaleTypes.map((type) => ({
                        title: type,
                        value: type,
                    }))}
                ></Select>
            </Form.Item>
            {/* //TODO: Check sequential color schemes */}
            <ColorSchemeSelector />
            <Form.Item
                label={
                    <Space>
                        <ColumnWidthOutlined />
                        {t('Margin')}
                    </Space>
                }
                name={'margin'}
            >
                <MarginInput />
            </Form.Item>
            <Form.Item
                label={
                    <Space>
                        <AreaChartOutlined />
                        {t('Enable Area')}
                    </Space>
                }
                name={'enableArea'}
                valuePropName={'checked'}
            >
                <Switch size={'small'} />
            </Form.Item>
            <Form.Item name={'areaBaselineValue'} label={<Space>{t('Area baseline')}</Space>}>
                <Slider min={0} max={max as unknown as number} />
            </Form.Item>
            <Form.Item name={'areaOpacity'} label={<Space>{t('Area Opacity')}</Space>}>
                <Slider step={0.01} min={0} max={1} />
            </Form.Item>
            <Form.Item name={'areaBlendMode'} label={<Space>{t('Area blend mode')}</Space>}>
                <Select
                    placeholder={'Blend mode'}
                    options={blendModeList.map((mode) => ({
                        value: mode,
                        label: mode,
                    }))}
                />
            </Form.Item>
        </>
    );
}
