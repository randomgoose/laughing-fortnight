//@ts-nocheck

import * as React from 'react';
import {Form, InputNumber} from 'antd';
import {useTranslation} from 'react-i18next';

export default function AdvancedConfig() {
    const {t} = useTranslation();

    return (
        <Form initialValues={{}} onValuesChange={(changedValues) => {}}>
            <Form.Item name={'decimalDigit'} label={t('Decimal places')}>
                <InputNumber min={0} />
            </Form.Item>
        </Form>
    );
}
