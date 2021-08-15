import * as React from 'react';
import {Space, Switch, Radio} from 'antd';
import Label from '../../Typography/Label';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {
    setLegendAlign,
    setLegendDirection,
    setLegendVerticalAlign,
    setShowLegend,
} from '../../../features/chart/lineChartSlice';
import {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';

export default () => {
    const dispatch = useDispatch();
    const {showLegend, legendDirection, legendAlign, legendVerticalAlign} = useSelector(
        (state: RootState) => state.line
    );

    return (
        <Space direction="vertical">
            <Space>
                <Label>图例</Label>
                <Switch
                    size={'small'}
                    checked={showLegend}
                    onChange={(checked) => dispatch(setShowLegend(checked))}
                ></Switch>
            </Space>
            <Radio.Group
                size={'small'}
                value={legendDirection}
                onChange={(e) => {
                    dispatch(setLegendDirection(e.target.value));
                }}
            >
                <Radio.Button value={'column'}>
                    <ArrowUpOutlined />
                </Radio.Button>
                <Radio.Button value={'row'}>
                    <ArrowRightOutlined />
                </Radio.Button>
            </Radio.Group>
            <Radio.Group
                size={'small'}
                value={legendAlign}
                onChange={(e) => {
                    dispatch(setLegendAlign(e.target.value));
                }}
            >
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
            <Radio.Group
                size={'small'}
                value={legendVerticalAlign}
                onChange={(e) => {
                    dispatch(setLegendVerticalAlign(e.target.value));
                }}
            >
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
        </Space>
    );
};
