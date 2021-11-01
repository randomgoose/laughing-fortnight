import {MenuOutlined} from '@ant-design/icons';
import {Form, Space, Switch, Typography, Slider} from 'antd';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {FcNumericalSorting12} from 'react-icons/fc';
import {Param} from '../../../atoms/appAtom';
import {useBar} from '../../../hooks/useBar';

export default function LabelConfig({id}: Param) {
    const {t} = useTranslation();
    const {bar, setPartialState} = useBar(id);
    const {enableLabel, labelSkipHeight, labelSkipWidth, labelTextColor} = bar;
    return (
        <>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcNumericalSorting12 />
                    {t('Label')}
                </Space>
            </Typography.Title>
            <Form
                layout={'vertical'}
                initialValues={{
                    enableLabel,
                    labelSkipHeight,
                    labelSkipWidth,
                    labelTextColor,
                }}
                onValuesChange={(changedValues) => {
                    setPartialState(changedValues);
                }}
            >
                <Form.Item
                    valuePropName={'checked'}
                    name={'enableLabel'}
                    label={
                        <Space align={'center'}>
                            <MenuOutlined rotate={90} />
                            {t('Enable Label')}
                        </Space>
                    }
                >
                    <Switch size={'small'}></Switch>
                </Form.Item>
                <Form.Item name={'labelSkipHeight'} label={t('Label skip Height')}>
                    <Slider />
                </Form.Item>
                <Form.Item name={'labelSkipWidth'} label={t('Label skip Width')}>
                    <Slider />
                </Form.Item>
            </Form>
        </>
    );
}
