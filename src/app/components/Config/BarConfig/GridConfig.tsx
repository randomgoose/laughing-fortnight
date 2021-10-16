import {MenuOutlined} from '@ant-design/icons';
import {Form, Space, Switch, Typography} from 'antd';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {FcGrid} from 'react-icons/fc';
import {useDispatch, useSelector} from 'react-redux';
import {setPartialState} from '../../../features/chart/barChartSlice';
import {RootState} from '../../../redux/store';

export default function GridConfig() {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {enableGridX, enableGridY} = useSelector((state: RootState) => state.bar);
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
                    enableGridX,
                    enableGridY,
                }}
                onValuesChange={(changedValues) => {
                    dispatch(setPartialState(changedValues));
                }}
            >
                <Form.Item
                    valuePropName={'checked'}
                    name={'enableGridX'}
                    label={
                        <Space align={'center'}>
                            <MenuOutlined rotate={90} />
                            {t('Grid X')}
                        </Space>
                    }
                >
                    <Switch size={'small'}></Switch>
                </Form.Item>
                <Form.Item
                    valuePropName={'checked'}
                    name={'enableGridY'}
                    label={
                        <Space align={'center'}>
                            <MenuOutlined />
                            {t('Grid Y')}
                        </Space>
                    }
                >
                    <Switch size={'small'}></Switch>
                </Form.Item>
            </Form>
        </>
    );
}
