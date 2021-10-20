import {MenuOutlined} from '@ant-design/icons';
import {Form, Space, Switch, Typography} from 'antd';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {FcGrid} from 'react-icons/fc';
import {useDispatch, useSelector} from 'react-redux';
import {setPartialState} from '../../../features/chart/lineChartSlice';
import {RootState} from '../../../redux/store';

export default function GridConfig() {
    const dispatch = useDispatch();
    const {showGridX, showGridY} = useSelector((state: RootState) => state.line);
    const {t} = useTranslation();
    return (
        <>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcGrid />
                    {t('Grid')}
                </Space>
            </Typography.Title>
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
                            {t('Grid X')}
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
                            {t('Grid Y')}
                        </Space>
                    }
                >
                    <Switch size={'small'} checked={showGridY}></Switch>
                </Form.Item>
            </Form>
        </>
    );
}
