import * as React from 'react';
import i18n from '../../i18n/i18n';
import {Form, Select} from 'antd';
import {useTranslation} from 'react-i18next';

const languages: {name: string; key: string}[] = [
    {name: '简体中文', key: 'zh'},
    {name: 'English', key: 'en'},
];

const initialValues = {
    language: 'en',
};

export default function Settings() {
    const {t} = useTranslation();

    return (
        <div>
            <Form initialValues={initialValues} layout={'vertical'}>
                <Form.Item name={'language'} label={t('Language')}>
                    <Select
                        style={{width: '100%'}}
                        options={languages.map((item) => ({
                            value: item.key,
                            label: item.name,
                        }))}
                        onChange={(value: string) => {
                            i18n.changeLanguage(value);
                        }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
}
