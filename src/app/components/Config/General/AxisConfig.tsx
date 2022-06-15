import * as React from 'react';
import {Switch, Collapse, Form, Input, Radio, Slider, InputNumber, Typography, Space} from 'antd';
import {AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined} from '@ant-design/icons';
import {FcRuler} from 'react-icons/fc';
import {StyledCollapsePanel} from '../../StyledComponents/StyledComponents';
import {useTranslation} from 'react-i18next';
import {SetStateAction} from 'jotai';
import {AxisProps} from '../../../../types';

export default function AxisConfig<T extends AxisProps>({
    state,
    set,
}: {
    state: T;
    set: (update: SetStateAction<T>) => void;
}) {
    const {t} = useTranslation();
    const {showXAxis, showYAxis} = state;
    const onShowXAxis = (checked: boolean) => set((prev) => ({...prev, showXAxis: checked}));
    const onShowYAxis = (checked: boolean) => set((prev) => ({...prev, showYAxis: checked}));

    return (
        <>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcRuler />
                    {t('Axis')}
                </Space>
            </Typography.Title>
            <Collapse key={'x-axis'} ghost activeKey={[showXAxis ? 'showXAxis' : '', showYAxis ? 'showYAxis' : '']}>
                <StyledCollapsePanel
                    collapsible={showXAxis ? 'header' : 'disabled'}
                    key={'showXAxis'}
                    header={t('Display xAxis')}
                    extra={<Switch size={'small'} checked={showXAxis} onChange={onShowXAxis} />}
                >
                    <Form.Item name={['axisBottom', 'legend']} label={t('Title')}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['axisBottom', 'legendPosition']} label={t('Legend Position')}>
                        <Radio.Group
                            optionType={'button'}
                            options={[
                                {value: 'start', label: <AlignLeftOutlined />},
                                {value: 'middle', label: <AlignCenterOutlined />},
                                {value: 'end', label: <AlignRightOutlined />},
                            ]}
                        ></Radio.Group>
                    </Form.Item>
                    <Form.Item name={['axisBottom', 'legendOffset']} label={t('Legend Offset')}>
                        <Slider />
                    </Form.Item>
                    <Form.Item name={['axisBottom', 'tickSize']} label={t('Tick Size')}>
                        <InputNumber formatter={(value) => value + 'px'} />
                    </Form.Item>
                    <Form.Item name={['axisBottom', 'tickRotation']} label={t('Tick Rotation')}>
                        <Slider min={-90} max={90} step={5} />
                    </Form.Item>
                    <Form.Item name={['axisBottom', 'tickPadding']} label={t('Tick Padding')}>
                        <Slider min={-90} max={90} step={1} />
                    </Form.Item>
                    <Form.Item name={['axisBottom', 'tickValues']} label={t('Tick Values')}>
                        <InputNumber />
                    </Form.Item>
                </StyledCollapsePanel>
                <StyledCollapsePanel
                    collapsible={showYAxis ? 'header' : 'disabled'}
                    key={'showYAxis'}
                    header={t('Display yAxis')}
                    extra={<Switch size={'small'} checked={showYAxis} onChange={onShowYAxis}></Switch>}
                >
                    <Form.Item name={['axisLeft', 'legend']} label={t('Title')}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['axisLeft', 'legendPosition']} label={t('Legend Position')}>
                        <Radio.Group
                            optionType={'button'}
                            options={[
                                {value: 'start', label: <AlignLeftOutlined />},
                                {value: 'middle', label: <AlignCenterOutlined />},
                                {value: 'end', label: <AlignRightOutlined />},
                            ]}
                        ></Radio.Group>
                    </Form.Item>
                    <Form.Item name={['axisLeft', 'legendOffset']} label={t('Legend Offset')}>
                        <Slider />
                    </Form.Item>
                    <Form.Item name={['axisLeft', 'tickSize']} label={t('Tick Size')}>
                        <InputNumber formatter={(value) => value + 'px'} />
                    </Form.Item>
                    <Form.Item name={['axisLeft', 'tickRotation']} label={t('Tick Rotation')}>
                        <Slider min={-90} max={90} step={5} />
                    </Form.Item>
                    <Form.Item name={['axisLeft', 'tickPadding']} label={t('Tick Padding')}>
                        <Slider min={-90} max={90} step={1} />
                    </Form.Item>
                    <Form.Item name={['axisLeft', 'tickValues']} label={t('Tick Values')}>
                        <InputNumber />
                    </Form.Item>
                </StyledCollapsePanel>
            </Collapse>
        </>
    );
}
