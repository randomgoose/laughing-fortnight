import {Select, Slider, Form, Typography, Space} from 'antd';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {FcLineChart} from 'react-icons/fc';

const curveTypes = [
    'basis',
    'cardinal',
    'catmullRom',
    'linear',
    'monotoneX',
    'monotoneY',
    'natural',
    'step',
    'stepAfter',
    'stepBefore',
];

export default function LinesConfig() {
    const {t} = useTranslation();
    return (
        <>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcLineChart />
                    {t('Lines')}
                </Space>
            </Typography.Title>
            <Form.Item name={'curve'} label={t('Curve')}>
                <Select>
                    {curveTypes.map((type) => (
                        <Select.Option key={type} value={type}>
                            {type}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name={'lineWidth'} label={t('Line width')}>
                <Slider min={1} max={20} />
            </Form.Item>
        </>
    );
}
