import * as React from 'react';
import {Switch, Collapse, Form, Input, Radio, Slider, InputNumber, Typography, Space} from 'antd';
import {AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined} from '@ant-design/icons';
import {FcRuler} from 'react-icons/fc';
import {StyledCollapsePanel} from '../../StyledComponents/StyledComponents';
import {useTranslation} from 'react-i18next';
import {PrimitiveAtom, useAtom} from 'jotai';
import {Param} from '../../../atoms/appAtom';
import {lineAtomFamily, LineState} from '../../../atoms/lineAtomFamily';
import {useLine} from '../../../hooks/useLine';

export default ({id}: Param) => {
    const [{showXAxis, showYAxis, axisBottom, axisLeft}] = useAtom(lineAtomFamily({id}) as PrimitiveAtom<LineState>);
    const {setPartialState} = useLine(id);
    const {t} = useTranslation();
    console.log(axisLeft);

    React.useEffect(() => {}, [showXAxis, showYAxis]);

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
                    extra={
                        <Switch
                            size={'small'}
                            checked={showXAxis}
                            onChange={(checked) => setPartialState({showXAxis: checked})}
                        ></Switch>
                    }
                >
                    <Form
                        layout={'vertical'}
                        initialValues={axisBottom}
                        onValuesChange={(changedValue) => {
                            console.log(changedValue);
                            setPartialState({axisBottom: Object.assign({...axisBottom}, changedValue)});
                        }}
                    >
                        <Form.Item name={'legend'} label={t('Legend')}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={'legendPosition'} label={t('Legend Position')}>
                            <Radio.Group
                                optionType={'button'}
                                options={[
                                    {value: 'start', label: <AlignLeftOutlined />},
                                    {value: 'middle', label: <AlignCenterOutlined />},
                                    {value: 'end', label: <AlignRightOutlined />},
                                ]}
                            ></Radio.Group>
                        </Form.Item>
                        <Form.Item name={'legendOffset'} label={t('Legend Offset')}>
                            <Slider />
                        </Form.Item>
                        <Form.Item name={'tickSize'} label={t('Tick Size')}>
                            <InputNumber formatter={(value) => value + 'px'} />
                        </Form.Item>
                        <Form.Item name={'tickRotation'} label={t('Tick Rotation')}>
                            <Slider min={-90} max={90} step={5} />
                        </Form.Item>
                        <Form.Item name={'tickPadding'} label={t('Tick Padding')}>
                            <Slider min={-90} max={90} step={1} />
                        </Form.Item>
                        <Form.Item name={'tickValues'} label={t('Tick Values')}>
                            <InputNumber />
                        </Form.Item>
                    </Form>
                </StyledCollapsePanel>
                <StyledCollapsePanel
                    collapsible={showYAxis ? 'header' : 'disabled'}
                    key={'showYAxis'}
                    header={t('Display yAxis')}
                    extra={
                        <Switch
                            size={'small'}
                            checked={showYAxis}
                            onChange={(checked) => setPartialState({showYAxis: checked})}
                        ></Switch>
                    }
                >
                    <Form
                        layout={'vertical'}
                        initialValues={axisLeft}
                        onValuesChange={(changedValue) => {
                            setPartialState({axisLeft: Object.assign({...axisLeft}, changedValue)});
                        }}
                    >
                        <Form.Item name={'legend'} label={t('Legend')}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={'legendPosition'} label={t('Legend Position')}>
                            <Radio.Group
                                optionType={'button'}
                                options={[
                                    {value: 'start', label: <AlignLeftOutlined />},
                                    {value: 'middle', label: <AlignCenterOutlined />},
                                    {value: 'end', label: <AlignRightOutlined />},
                                ]}
                            ></Radio.Group>
                        </Form.Item>
                        <Form.Item name={'legendOffset'} label={t('Legend Offset')}>
                            <Slider />
                        </Form.Item>
                        <Form.Item name={'tickSize'} label={t('Tick Size')}>
                            <InputNumber formatter={(value) => value + 'px'} />
                        </Form.Item>
                        <Form.Item name={'tickRotation'} label={t('Tick Rotation')}>
                            <Slider min={-90} max={90} step={5} />
                        </Form.Item>
                        <Form.Item name={'tickPadding'} label={t('Tick Padding')}>
                            <Slider min={-90} max={90} step={1} />
                        </Form.Item>
                        <Form.Item name={'tickValues'} label={t('Tick Values')}>
                            <InputNumber />
                        </Form.Item>
                    </Form>
                </StyledCollapsePanel>
            </Collapse>
        </>
    );
};
