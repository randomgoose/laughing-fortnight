import * as React from 'react';
import i18n from '../../i18n/i18n';
import {Radio} from 'antd';
import {useTranslation} from 'react-i18next';

const languages: {name: string; key: string}[] = [
    {name: '简体中文', key: 'zh'},
    {name: 'English', key: 'en'},
];

export default function Settings() {
    const {t} = useTranslation();
    return (
        <>
            <h6 className={'mb-2 font-bold'}>{t('Language')}</h6>
            <Radio.Group
                defaultValue={i18n.language}
                className={'w-full'}
                optionType={'button'}
                buttonStyle={'outline'}
                options={languages.map((item) => ({
                    value: item.key,
                    label: item.name,
                }))}
                onChange={(e) => {
                    i18n.changeLanguage(e.target.value);
                }}
            />
        </>
    );
}
