import {LineProps} from '@nivo/line';
import {Select, Slider} from 'antd';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCurve, setLineWidth} from '../../../features/chart/lineChartSlice';
import {RootState} from '../../../redux/store';
import Label from '../../Typography/Label';

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
    const dispatch = useDispatch();
    const {curve} = useSelector((state: RootState) => state.line);
    return (
        <>
            <Label>形状</Label>
            <Select
                style={{width: '100%'}}
                onChange={(value: LineProps['curve']) => dispatch(setCurve(value))}
                value={curve}
            >
                {curveTypes.map((type) => (
                    <Select.Option key={type} value={type}>
                        {type}
                    </Select.Option>
                ))}
            </Select>
            <Slider min={1} max={20} onChange={(value) => dispatch(setLineWidth(value))} />
        </>
    );
}
