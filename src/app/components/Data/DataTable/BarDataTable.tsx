import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Space, Table, message} from 'antd';
import cryptoRandomString from 'crypto-random-string';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Param} from '../../../atoms/appAtom';
import {useBar} from '../../../hooks/useBar';
import EditableDiv from '../../CustomInput/EditableDiv';
import DataMock from '../DataMock/DataMock';

export default function BarDataTable({id}: Param) {
    const {t} = useTranslation();
    const {bar, setData, setKey, removeKey, addKey} = useBar(id);

    return (
        <>
            <DataMock />
            <Table
                rowKey={bar.indexBy as string}
                key={'barDataTable'}
                dataSource={bar.data}
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
                                    setData(bar.data.indexOf(record), bar.indexBy as string, value);
                                }}
                            />
                        ),
                    },
                    ...bar.keys.map((key) => {
                        return {
                            key,
                            dataIndex: key,
                            title: (
                                <Space key={key}>
                                    <EditableDiv
                                        key={key}
                                        value={key}
                                        validate={(value: string) =>
                                            bar.keys.filter((item) => item !== key).includes(value)
                                        }
                                        onFinishEditing={(value: string) => {
                                            if (bar.keys.filter((item) => item !== key).includes(value)) {
                                                message.error(`${value} 已存在`);
                                                return;
                                            } else {
                                                setKey(key, value);
                                            }
                                        }}
                                    />
                                    <Button icon={<DeleteOutlined />} onClick={() => removeKey(key)}></Button>
                                </Space>
                            ),
                            render: (value, record) => {
                                return (
                                    <EditableDiv
                                        value={value}
                                        key={value}
                                        onFinishEditing={(value: number) => {
                                            setData(bar.data.indexOf(record), key, value);
                                        }}
                                    />
                                );
                            },
                        };
                    }),
                    {
                        title: (
                            <Button
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
        </>
    );
}
