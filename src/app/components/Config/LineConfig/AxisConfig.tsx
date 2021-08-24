import * as React from 'react';
import {Switch, Collapse, Form, Input, Radio, Slider, InputNumber} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setAxis, setShowXAxis, setShowYAxis} from '../../../features/chart/lineChartSlice';
import CollapsePanel from '../../StyledComponents/StyledCollapsePanel';
import {AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined} from '@ant-design/icons';

export default () => {
    const dispatch = useDispatch();
    const {showXAxis, showYAxis, axisBottom} = useSelector((state: RootState) => state.line);

    React.useEffect(() => {}, [showXAxis, showYAxis]);

    return (
        <>
            <Collapse key={'x-axis'} ghost>
                <CollapsePanel
                    collapsible={showXAxis ? 'header' : 'disabled'}
                    key={'showXAxis'}
                    header={'显示 x 轴'}
                    extra={
                        <Switch
                            size={'small'}
                            checked={showXAxis}
                            onChange={(checked) => dispatch(setShowXAxis(checked))}
                        ></Switch>
                    }
                >
                    <Form
                        layout={'vertical'}
                        initialValues={axisBottom}
                        onValuesChange={(changedValue) => {
                            dispatch(setAxis({which: 'axisBottom', props: changedValue}));
                        }}
                    >
                        <Form.Item name={'legend'} label={'X轴标题'}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name={'legendPosition'} label={'标题位置'}>
                            <Radio.Group
                                optionType={'button'}
                                options={[
                                    {value: 'start', label: <AlignLeftOutlined />},
                                    {value: 'middle', label: <AlignCenterOutlined />},
                                    {value: 'end', label: <AlignRightOutlined />},
                                ]}
                            ></Radio.Group>
                        </Form.Item>
                        <Form.Item name={'legendOffset'} label={'标题偏移'}>
                            <Slider />
                        </Form.Item>
                        <Form.Item name={'tickSize'} label={'标签字号'}>
                            <InputNumber formatter={(value) => value + 'px'} />
                        </Form.Item>
                        <Form.Item name={'tickRotation'} label={'标签旋转'}>
                            <Slider min={-90} max={90} step={5} />
                        </Form.Item>
                        <Form.Item name={'tickPadding'} label={'标签到轴线的距离'}>
                            <Slider min={-90} max={90} step={1} />
                        </Form.Item>
                        <Form.Item name={'tickValues'} label={'??'}>
                            <InputNumber />
                        </Form.Item>
                    </Form>
                </CollapsePanel>
                <CollapsePanel
                    collapsible={showYAxis ? 'header' : 'disabled'}
                    key={'showYAxis'}
                    header={'显示 y 轴'}
                    extra={
                        <Switch
                            size={'small'}
                            checked={showYAxis}
                            onChange={(checked) => dispatch(setShowYAxis(checked))}
                        ></Switch>
                    }
                ></CollapsePanel>
            </Collapse>
        </>
    );
};
