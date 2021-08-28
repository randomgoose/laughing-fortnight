import * as React from 'react';
import {Radio, Form, Slider, Collapse, Button, Space} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setLegend, setPartialState, removeLegendByIndex} from '../../../features/chart/lineChartSlice';
import {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import {useThrottle} from 'ahooks';
import Anchor from '../../CustomInput/Anchor';

export default () => {
    const dispatch = useDispatch();
    const {legends} = useSelector((state: RootState) => state.line);
    useThrottle(legends, {wait: 500});

    const addLegend = React.useCallback(() => {
        dispatch(setPartialState({legends: [...legends, {...legends[0]}]}));
    }, [legends]);

    const deleteLegendByIndex = React.useCallback(
        (index: number) => {
            dispatch(removeLegendByIndex(index));
        },
        [legends]
    );

    return (
        <Space style={{width: '100%'}} direction={'vertical'}>
            <Collapse collapsible={'header'}>
                {legends.map((legend, index) => {
                    return (
                        <Collapse.Panel
                            key={index}
                            header={`图例 ${index}`}
                            extra={
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    size={'small'}
                                    onClick={() => deleteLegendByIndex(index)}
                                />
                            }
                        >
                            <Form
                                onValuesChange={(changedValues) => {
                                    dispatch(setLegend({index: index, newLegend: changedValues}));
                                }}
                                initialValues={legend}
                            >
                                <Form.Item name={'direction'} label={'图例方向'}>
                                    <Radio.Group size={'small'}>
                                        <Radio.Button value={'column'}>
                                            <ArrowUpOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'row'}>
                                            <ArrowRightOutlined />
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name={'translateX'} label={'translateX'}>
                                    <Slider />
                                </Form.Item>
                                <Form.Item name={'translateY'} label={'translateY'}>
                                    <Slider />
                                </Form.Item>
                                <Form.Item name={'legendAlign'} label={'图例对齐方式'}>
                                    <Radio.Group size={'small'}>
                                        <Radio.Button value={'left'}>
                                            <AlignLeftOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'center'}>
                                            <AlignCenterOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'right'}>
                                            <AlignRightOutlined />
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name={'legendVerticalAlign'} label={'垂直对齐方式'}>
                                    <Radio.Group size={'small'}>
                                        <Radio.Button value={'top'}>
                                            <AlignLeftOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'middle'}>
                                            <AlignCenterOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'bottom'}>
                                            <AlignRightOutlined />
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name={'anchor'} label={'位置'}>
                                    <Anchor />
                                </Form.Item>
                            </Form>
                        </Collapse.Panel>
                    );
                })}
            </Collapse>
            <Button icon={<PlusOutlined />} onClick={addLegend}>
                新增图例
            </Button>
        </Space>
    );
};
