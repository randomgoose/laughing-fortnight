import {PlusOutlined} from '@ant-design/icons';
import {Box, Flex, Input} from '@chakra-ui/react';
import {Table, message} from 'antd';
import {IconButton, Button} from '@chakra-ui/react';
import cryptoRandomString from 'crypto-random-string';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Param} from '../../../atoms/appAtom';
import {useBar} from '../../../hooks/useBar';
import EditableDiv from '../../CustomInput/EditableDiv';
import DataMock from '../DataMock/DataMock';
import {FiX} from 'react-icons/fi';

export default function BarDataTable({id}: Param) {
    const {t} = useTranslation();
    const {bar, setData, setKey, removeKey, addKey, addRow} = useBar(id);

    return (
        <Box w={'full'} h={'full'}>
            <DataMock />
            <Table
                rowKey={bar.indexBy as string}
                key={'barDataTable'}
                dataSource={bar.data}
                scroll={{y: 140, x: 2000}}
                footer={() => (
                    <Button onClick={addRow} size={'sm'}>
                        {t('Add row')}
                    </Button>
                )}
                columns={[
                    {
                        title: 'id',
                        dataIndex: bar.indexBy as string,
                        key: 'add_column',
                        render: (value, record) => (
                            <EditableDiv
                                value={value}
                                key={value}
                                onFinishEditing={(value: number) => {
                                    if (bar.data.some((datum) => datum[bar.indexBy as string] === value)) {
                                        message.error(`${value} ${t('exists')}`);
                                        return;
                                    }
                                    setData(bar.data.indexOf(record), bar.indexBy as string, value);
                                }}
                            />
                        ),
                        fixed: 'left',
                        width: 120,
                    },
                    ...bar.keys.map((key) => {
                        return {
                            key,
                            dataIndex: key,
                            width: 120,
                            title: (
                                <Flex key={key} align={'center'} role={'group'}>
                                    <EditableDiv
                                        key={key}
                                        value={key}
                                        validate={(value: string) =>
                                            bar.keys.filter((item) => item !== key).includes(value)
                                        }
                                        onFinishEditing={(value: string) => {
                                            if (value.length <= 0) {
                                                message.error(`${t('Cannot leave this input empty')}`);
                                                return;
                                            } else if (bar.keys.filter((item) => item !== key).includes(value)) {
                                                message.error(`${value} ${t('exists')}`);
                                                return;
                                            } else {
                                                setKey(key, value);
                                            }
                                        }}
                                    />
                                    <IconButton
                                        ml={1}
                                        opacity={0}
                                        transition={'all .2s'}
                                        _groupHover={{opacity: 1}}
                                        icon={<FiX />}
                                        onClick={() => removeKey(key)}
                                        aria-label="remove column"
                                        size={'xs'}
                                        variant="ghost"
                                    />
                                </Flex>
                            ),
                            render: (value, record) => {
                                return (
                                    <Input
                                        value={value}
                                        key={record.id}
                                        variant={'unstyled'}
                                        size={'sm'}
                                        onChange={(e) => {
                                            const newValue = parseFloat(e.target.value);
                                            if (Number.isNaN(newValue)) {
                                                console.log('nan', newValue);
                                                setData(bar.data.indexOf(record), key, 0);
                                            } else {
                                                if (e.target.value.endsWith('.')) {
                                                    setData(bar.data.indexOf(record), key, newValue);
                                                } else {
                                                    setData(bar.data.indexOf(record), key, newValue);
                                                }
                                            }
                                        }}
                                    />
                                );
                            },
                        };
                    }),
                    {
                        title: (
                            <Button
                                size={'xs'}
                                variant={'outlined'}
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    addKey(cryptoRandomString({length: 4}));
                                }}
                            >
                                {t('Add column')}
                            </Button>
                        ),
                        key: 'add_column',
                    },
                ]}
            ></Table>
        </Box>
    );
}
