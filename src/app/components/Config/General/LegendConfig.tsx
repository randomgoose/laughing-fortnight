import * as React from 'react';
import {Radio, Form, Slider, Collapse, Button, Space, Typography} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {chartSlice as lineSlice} from '../../../features/chart/lineChartSlice';
import {chartSlice as barSlice} from '../../../features/chart/barChartSlice';
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
import {FcAbout} from 'react-icons/fc';
import {StyledCollapsePanel} from '../../StyledComponents/StyledComponents';
import {baseLegend} from '../../../data/baseLegend';

export default () => {
    const dispatch = useDispatch();
    const {line, bar} = useSelector((state: RootState) => state);
    const {chartType} = useSelector((state: RootState) => state.app);
    useThrottle(line.legends, {wait: 500});
    useThrottle(bar.legends, {wait: 500});

    const addLegend = React.useCallback(() => {
        switch (chartType) {
            case 'line':
                dispatch(lineSlice.actions.setPartialState({legends: [...line.legends, {...baseLegend[0]}]}));
                break;
            case 'bar':
                dispatch(
                    barSlice.actions.setPartialState({legends: [...bar.legends, {...baseLegend[0], dataFrom: 'keys'}]})
                );
                break;
        }
    }, [line.legends, chartType, bar.legends]);

    const getLegends = React.useCallback(() => {
        switch (chartType) {
            case 'line':
                return line.legends;
            case 'bar':
                return bar.legends;
        }
    }, [line.legends, bar.legends, chartType]);

    const deleteLegendByIndex = React.useCallback(
        (index: number) => {
            switch (chartType) {
                case 'line':
                    dispatch(lineSlice.actions.removeLegendByIndex(index));
                    break;
                case 'bar':
                    dispatch(barSlice.actions.removeLegendByIndex(index));
                    break;
            }
        },
        [line.legends, chartType, bar.legends]
    );

    return (
        <Space style={{width: '100%'}} direction={'vertical'}>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcAbout />
                    图例设置
                </Space>
            </Typography.Title>
            <Collapse collapsible={'header'} ghost>
                {getLegends().map((legend, index) => {
                    return (
                        <StyledCollapsePanel
                            key={index}
                            header={`图例 ${index}`}
                            extra={
                                <span
                                    onClick={() => deleteLegendByIndex(index)}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <DeleteOutlined />
                                </span>
                            }
                        >
                            <Form
                                onValuesChange={(changedValues) => {
                                    switch (chartType) {
                                        case 'line':
                                            dispatch(
                                                lineSlice.actions.setLegend({index: index, newLegend: changedValues})
                                            );
                                            break;
                                        case 'bar':
                                            dispatch(
                                                barSlice.actions.setLegend({
                                                    index: index,
                                                    newLegend: {...changedValues, dataFrom: 'keys'},
                                                })
                                            );
                                            break;
                                    }
                                }}
                                initialValues={legend}
                                layout={'vertical'}
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
                        </StyledCollapsePanel>
                    );
                })}
            </Collapse>
            <Button icon={<PlusOutlined />} onClick={addLegend}>
                新增图例
            </Button>
        </Space>
    );
};
