import * as React from 'react';
import {Space, Switch, Input} from 'antd';
import Label from '../../Typography/Label';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setShowXAxis, setShowYAxis, setXAxisLabel} from '../../../features/chart/lineChartSlice';

export default () => {
    const dispatch = useDispatch();
    const {showXAxis, showYAxis} = useSelector((state: RootState) => state.line);

    return (
        <Space direction={'vertical'}>
            <Space>
                <Label>显示 X 轴</Label>
                <Switch
                    size={'small'}
                    checked={showXAxis}
                    onChange={(checked) => dispatch(setShowXAxis(checked))}
                ></Switch>
            </Space>
            {showXAxis ? (
                <Space direction={'vertical'} size={2}>
                    <Label>Title</Label>
                    <Input
                        onChange={(e) => {
                            dispatch(setXAxisLabel(e.target.value));
                        }}
                    ></Input>
                </Space>
            ) : null}
            <Space>
                <Label>显示 Y 轴</Label>
                <Switch
                    size={'small'}
                    checked={showYAxis}
                    onChange={(checked) => dispatch(setShowYAxis(checked))}
                ></Switch>
            </Space>
        </Space>
    );
};
