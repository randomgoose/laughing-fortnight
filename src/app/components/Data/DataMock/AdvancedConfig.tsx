import * as React from 'react';
import {Form, InputNumber} from 'antd';
import {useTranslation} from 'react-i18next';
import {useApp} from '../../../hooks/useApp';

export default function AdvancedConfig() {
    const {setPartialState, app} = useApp();
    const {t} = useTranslation();

    return (
        <Form
            initialValues={app}
            onValuesChange={(changedValues) => {
                setPartialState(changedValues);
            }}
        >
            <Form.Item name={'decimalDigit'} label={t('Decimal places')}>
                <InputNumber min={0} />
            </Form.Item>
        </Form>
    );
}
