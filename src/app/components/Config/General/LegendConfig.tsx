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
import {useTranslation} from 'react-i18next';

export default () => {
    const dispatch = useDispatch();
    const {line, bar} = useSelector((state: RootState) => state);
    const {chartType} = useSelector((state: RootState) => state.app);
    useThrottle(line.legends, {wait: 500});
    useThrottle(bar.legends, {wait: 500});
    const {t} = useTranslation();

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
                    {t('Legend')}
                </Space>
            </Typography.Title>
            <Collapse collapsible={'header'} ghost>
                {getLegends().map((legend, index) => {
                    return (
                        <StyledCollapsePanel
                            key={index}
                            header={`${t('Legend')} ${index}`}
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
                                <Form.Item name={'direction'} label={t('Direction')}>
                                    <Radio.Group size={'small'}>
                                        <Radio.Button value={'column'}>
                                            <ArrowUpOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'row'}>
                                            <ArrowRightOutlined />
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name={'translateX'} label={t('Translate X')}>
                                    <Slider min={-500} max={500} />
                                </Form.Item>
                                <Form.Item name={'translateY'} label={t('Translate Y')}>
                                    <Slider min={-500} max={500} />
                                </Form.Item>
                                <Form.Item name={'legendAlign'} label={t('Legend Align')}>
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
                                <Form.Item name={'legendVerticalAlign'} label={t('Legend Vertical Align')}>
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
                                <Form.Item name={'anchor'} label={t('Anchor')}>
                                    <Anchor />
                                </Form.Item>
                            </Form>
                        </StyledCollapsePanel>
                    );
                })}
            </Collapse>
            <Button icon={<PlusOutlined />} onClick={addLegend}>
                {t('New Legend')}
            </Button>
        </Space>
    );
};
