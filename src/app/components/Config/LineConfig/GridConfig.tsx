import {MenuOutlined} from '@ant-design/icons';
import {Form, Space, Switch, Typography} from 'antd';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {FcGrid} from 'react-icons/fc';
import {Param} from '../../../atoms/appAtom';
import {useAtom} from 'jotai';
import {lineAtomFamily} from '../../../atoms/lineAtomFamily';
import {useLine} from '../../../hooks/useLine';

export default function GridConfig({id}: Param) {
    const [{enableGridX, enableGridY}] = useAtom(lineAtomFamily({id}));
    const {setPartialState} = useLine(id);
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
                    enableGridX,
                    enableGridY,
                }}
                onValuesChange={(changedValues) => {
                    setPartialState(changedValues);
                }}
            >
                <Form.Item
                    name={'enableGridX'}
                    label={
                        <Space align={'center'}>
                            <MenuOutlined rotate={90} />
                            {t('Grid X')}
                        </Space>
                    }
                >
                    <Switch size={'small'} checked={enableGridX}></Switch>
                </Form.Item>
                <Form.Item
                    name={'enableGridY'}
                    label={
                        <Space align={'center'}>
                            <MenuOutlined />
                            {t('Grid Y')}
                        </Space>
                    }
                >
                    <Switch size={'small'} checked={enableGridY}></Switch>
                </Form.Item>
            </Form>
        </>
    );
}
