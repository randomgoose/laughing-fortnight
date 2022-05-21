import * as React from 'react';
import {Switch, Collapse, Form, Input, Radio, Slider, InputNumber, Typography, Space} from 'antd';
import {AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined} from '@ant-design/icons';
import {FcRuler} from 'react-icons/fc';
import {StyledCollapsePanel} from '../../StyledComponents/StyledComponents';
import {useTranslation} from 'react-i18next';
import {Param} from '../../../atoms/appAtom';
import {useScatter} from '../../../hooks/useScatter';

export default ({id}: Param) => {
    const {scatter, setPartialState} = useScatter(id);
    const {enableXAxis, enableYAxis, axisBottom, axisLeft} = scatter;

    React.useEffect(() => {}, [enableXAxis, enableYAxis]);
    const {t} = useTranslation();

    return (
        <>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcRuler />
                    {t('Axis')}
                </Space>
            </Typography.Title>
            <Collapse
                key={'x-axis'}
                ghost
                activeKey={[enableXAxis ? 'enableXAxis' : '', enableYAxis ? 'enableYAxis' : '']}
            >
                <StyledCollapsePanel
                    collapsible={enableXAxis ? 'header' : 'disabled'}
                    key={'enableXAxis'}
                    header={t('Display xAxis')}
                    extra={
                        <Switch
                            size={'small'}
                            checked={enableXAxis}
                            onChange={(checked) => setPartialState({enableXAxis: checked})}
                        ></Switch>
                    }
                >
                    <Form
                        layout={'vertical'}
                        initialValues={axisBottom ? axisBottom : undefined}
                        onValuesChange={(changedValue) => {
                            setPartialState({axisBottom: Object.assign({...axisBottom}, changedValue)});
                        }}
                    >
                        <Form.Item name={'legend'} label={t('Title')}>
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
                    collapsible={enableYAxis ? 'header' : 'disabled'}
                    key={'enableYAxis'}
                    header={t('Display yAxis')}
                    extra={
                        <Switch
                            size={'small'}
                            checked={enableYAxis}
                            onChange={(checked) => setPartialState({enableYAxis: checked})}
                        ></Switch>
                    }
                >
                    <Form
                        layout={'vertical'}
                        initialValues={axisLeft ? axisLeft : undefined}
                        onValuesChange={(changedValue) => {
                            setPartialState({axisLeft: Object.assign({...axisLeft}, changedValue)});
                        }}
                    >
                        <Form.Item name={'legend'} label={t('Title')}>
                            <Input></Input>
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
