import {MenuOutlined} from '@ant-design/icons';
import {Form, Space, Switch, Typography} from 'antd';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {FcGrid} from 'react-icons/fc';
import {Param} from '../../../atoms/appAtom';
import {useScatter} from '../../../hooks/useScatter';

export default function GridConfig({id}: Param) {
    const {t} = useTranslation();
    const {scatter, setPartialState} = useScatter(id);
    const {enableGridX, enableGridY} = scatter;
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
                    setPartialState(changedValues);
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
