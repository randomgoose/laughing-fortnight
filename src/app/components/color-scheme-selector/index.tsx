import * as React from 'react';
import {Form, Select, Space} from 'antd';
import {HighlightOutlined} from '@ant-design/icons';
import {useTranslation} from 'react-i18next';
import {colorSchemes} from '@nivo/colors';
import {getColorSchemesAtom} from '../../atoms/colors';
import {useAtom} from 'jotai';

const colorSchemeList = Object.keys(colorSchemes);

export default function ColorSchemeSelector() {
    const {t} = useTranslation();
    const [customSchemes] = useAtom(getColorSchemesAtom);

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
                            <Select.Option key={scheme.id} value={scheme.id}>
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
