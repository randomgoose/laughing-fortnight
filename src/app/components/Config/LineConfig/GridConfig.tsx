import {MenuOutlined} from '@ant-design/icons';
import {Space, Switch} from 'antd';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setShowGridX, setShowGridY} from '../../../features/chart/lineChartSlice';
import {RootState} from '../../../redux/store';
import Label from '../../Typography/Label';

export default function GridConfig() {
    const dispatch = useDispatch();
    const {showGridX, showGridY} = useSelector((state: RootState) => state.line);
    return (
        <Space direction={'vertical'}>
            <Space>
                <MenuOutlined rotate={90} />

                <Label>纵向网格</Label>
                <Switch
                    size={'small'}
                    checked={showGridX}
                    onChange={(checked) => dispatch(setShowGridX(checked))}
                ></Switch>
            </Space>
            <Space>
                <MenuOutlined />
                <Label>横向网格</Label>
                <Switch
                    size={'small'}
                    checked={showGridY}
                    onChange={(checked) => dispatch(setShowGridY(checked))}
                ></Switch>
            </Space>
        </Space>
    );
}
