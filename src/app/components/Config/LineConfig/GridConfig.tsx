import {MenuOutlined} from '@ant-design/icons';
import {Form, Space, Switch} from 'antd';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPartialState} from '../../../features/chart/lineChartSlice';
import {RootState} from '../../../redux/store';

export default function GridConfig() {
    const dispatch = useDispatch();
    const {showGridX, showGridY} = useSelector((state: RootState) => state.line);
    return (
        <Form
            initialValues={{
                showGridX,
                showGridY,
            }}
            onValuesChange={(changedValues) => {
                dispatch(setPartialState(changedValues));
            }}
        >
            <Form.Item
                name={'showGridX'}
                label={
                    <Space align={'center'}>
                        <MenuOutlined rotate={90} />
                        纵向网格
                    </Space>
                }
            >
                <Switch size={'small'} checked={showGridX}></Switch>
            </Form.Item>
            <Form.Item
                name={'showGridY'}
                label={
                    <Space align={'center'}>
                        <MenuOutlined />
                        横向网格
                    </Space>
                }
            >
                <Switch size={'small'} checked={showGridY}></Switch>
            </Form.Item>
        </Form>
    );
}
