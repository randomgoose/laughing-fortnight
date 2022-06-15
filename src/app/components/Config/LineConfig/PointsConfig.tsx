import * as React from 'react';
import {Form, Radio, Slider, Space, Switch, Typography} from 'antd';
import {useTranslation} from 'react-i18next';
import {FcOrgUnit} from 'react-icons/fc';
import Label from '../../Typography/Label';

export default function PointsConfig() {
    const {t} = useTranslation();

    return (
        <>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcOrgUnit />
                    {t('Points')}
                </Space>
            </Typography.Title>
            <Form.Item
                name={'enablePoints'}
                label={<Label>{t('Enable points')}</Label>}
                fieldKey={'enable-points'}
                valuePropName={'checked'}
            >
                <Switch size={'small'}></Switch>
            </Form.Item>
            <Form.Item name={'pointSize'} label={<Label>{t('Point size')}</Label>}>
                <Slider min={1} max={20} />
            </Form.Item>
            <Form.Item name={'pointColor'} label={t('Point Color')}>
                <Radio.Group
                    optionType={'button'}
                    options={[
                        {value: JSON.stringify({from: 'color', modifier: []}), label: t('Default')},
                        {value: '#000000', label: t('Custom')},
                    ]}
                />
            </Form.Item>
        </>
    );
}
