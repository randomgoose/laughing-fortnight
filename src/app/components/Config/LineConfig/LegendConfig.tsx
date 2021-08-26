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
import {useTransition} from '@react-spring/core';
import {animated} from '@react-spring/web';
// import {animated} from '@react-spring/web';

export default () => {
    const dispatch = useDispatch();
    const {legends} = useSelector((state: RootState) => state.line);
    useThrottle(legends, {wait: 500});

    const transition = useTransition(legends, {
        from: {opacity: 0, transform: 'translateX(-10px)'},
        enter: () => async (next) => {
            await next({
                opacity: 1,
                transform: 'translateX(0px)',
            });
        },
        to: {opacity: 0, transform: 'translateX(-10px)'},
    });

    function addLegend() {
        dispatch(setPartialState({legends: [...legends, {...legends[0]}]}));
    }

    function deleteLegendByIndex(index: number) {
        dispatch(removeLegendByIndex(index));
    }

    const AnimatedPanel = animated(Collapse.Panel);

    return (
        <Space style={{width: '100%'}} direction={'vertical'}>
            <Collapse collapsible={'header'} ghost>
                {transition((style, item) => {
                    const index = legends.indexOf(item);
                    return item ? (
                        <AnimatedPanel
                            style={style}
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
                                initialValues={item}
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
                            </Form>
                        </AnimatedPanel>
                    ) : (
                        ''
                    );
                })}
            </Collapse>
            <Button icon={<PlusOutlined />} onClick={addLegend}>
                新增图例
            </Button>
        </Space>
    );
};
