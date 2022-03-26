import * as React from 'react';
import i18n from '../../i18n/i18n';
import {Radio, Space} from 'antd';
import {useTranslation} from 'react-i18next';
import {Button} from '@chakra-ui/button';
import {useDisclosure} from '@chakra-ui/hooks';
import ColorSchemeBuilder from './ThemeBuilder/ColorSchemeBuilder';
import {useAtom} from 'jotai';
import {appAtom} from '../atoms/appAtom';
import {sendMessage} from '../utils/send-message';
import {Flex, Heading} from '@chakra-ui/react';

const languages: {name: string; key: string}[] = [
    {name: '简体中文', key: 'zh'},
    {name: 'English', key: 'en'},
];

export default function Settings() {
    const {t} = useTranslation();
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [{windowSize}] = useAtom(appAtom);

    return (
        <Space direction={'vertical'}>
            <Space direction={'vertical'} className={'mb-2'}>
                <h6 className={'font-bold'}>{t('Language')}</h6>
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
            </Space>
            <Space direction={'vertical'} className={'mb-2'}>
                <h6 className={'font-bold'}>{t('Theme')}</h6>
                <Button size={'xs'} onClick={onOpen}>
                    {t('Theme maker')}
                </Button>
            </Space>
            <Space direction={'vertical'} className={'mb-2'}>
                <h6 className={'font-bold'}>{t('Window size')}</h6>
                <Radio.Group
                    defaultValue={windowSize}
                    onChange={(e) => sendMessage('resize-window', {size: e.target.value})}
                    options={[
                        {
                            value: 'sm',
                            label: t('sm'),
                        },
                        {
                            value: 'md',
                            label: t('md'),
                        },
                        {
                            value: 'lg',
                            label: t('lg'),
                        },
                    ]}
                    optionType={'button'}
                />
            </Space>
            <ColorSchemeBuilder isOpen={isOpen} onClose={onClose} isCentered size={'3xl'} />
            <Flex direction={'column'}>
                <Heading as={'h6'}>{t('Version')}</Heading>
                v7
            </Flex>
        </Space>
    );
}
