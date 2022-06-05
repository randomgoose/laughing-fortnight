import * as React from 'react';
import i18n from '../../i18n/i18n';
import {Radio, Space} from 'antd';
import {useTranslation} from 'react-i18next';
import {Button} from '@chakra-ui/button';
import {useDisclosure} from '@chakra-ui/hooks';
import {useAtom} from 'jotai';
import {appAtom} from '../atoms/appAtom';
import {sendMessage} from '../utils/send-message';
import {
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import Versions from './versions';

const languages: {name: string; key: string}[] = [
    {name: '简体中文', key: 'zh'},
    {name: 'English', key: 'en'},
];

export default function Settings() {
    const {t} = useTranslation();
    const {isOpen: isVersionsOpen, onClose: onVersionsClose, onOpen: onVersionsOpen} = useDisclosure();
    const [{windowSize}] = useAtom(appAtom);

    return (
        <Space direction={'vertical'}>
            <Flex direction={'column'} mb={2} gridGap={2}>
                <Heading as={'h6'}>{t('Language')}</Heading>
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
            </Flex>
            <Space direction={'vertical'} className={'mb-2'}>
                <Heading as={'h6'}>{t('Theme')}</Heading>
            </Space>
            <Space direction={'vertical'} className={'mb-2'}>
                <Heading as={'h6'}>{t('Window size')}</Heading>
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
            <Flex direction={'column'} gridGap={2}>
                <Heading as={'h6'}>{t('Version 7')}</Heading>
                <Button size={'xs'} onClick={onVersionsOpen}>
                    {t('Version History')}
                </Button>
            </Flex>
            <Modal isOpen={isVersionsOpen} onClose={onVersionsClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>{t('Version History')}</ModalHeader>
                    <ModalBody>
                        <Versions />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Space>
    );
}
