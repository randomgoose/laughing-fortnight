import * as React from 'react';
import {Form, Select, Space} from 'antd';
import {HighlightOutlined} from '@ant-design/icons';
import {useTranslation} from 'react-i18next';
import {colorSchemes} from '@nivo/colors';
import {useApp} from '../../hooks/useApp';

const colorSchemeList = Object.keys(colorSchemes);

export default function ColorSchemeSelector() {
    const {t} = useTranslation();
    const {
        app: {colorSchemes: customSchemes},
    } = useApp();

    return (
        <Form.Item
            label={
                <Space>
                    <HighlightOutlined />
                    {t('Colors')}
                </Space>
            }
            name={'colorSchemeId'}
        >
            <Select style={{width: '100%'}}>
                {customSchemes.length > 0 ? (
                    <Select.OptGroup label={'Custom colors'}>
                        {customSchemes.map((scheme) => (
                            <Select.Option key={scheme.name} value={scheme.id}>
                                {scheme.name}
                            </Select.Option>
                        ))}
                    </Select.OptGroup>
                ) : null}
                <Select.OptGroup label={'Nivo colors'}>
                    {colorSchemeList.map((scheme) => (
                        <Select.Option key={scheme} value={scheme}>
                            {scheme}
                        </Select.Option>
                    ))}
                </Select.OptGroup>
            </Select>
        </Form.Item>
    );
}
