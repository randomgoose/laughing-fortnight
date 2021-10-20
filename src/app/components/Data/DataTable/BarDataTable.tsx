import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Space, Table, message} from 'antd';
import cryptoRandomString from 'crypto-random-string';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {setData, setKey, removeKey} from '../../../features/chart/barChartSlice';
import {addKey} from '../../../features/chart/barChartSlice';
import {RootState} from '../../../redux/store';
import EditableDiv from '../../CustomInput/EditableDiv';

export default function BarDataTable() {
    const {data, keys, indexBy} = useSelector((state: RootState) => state.bar);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    return (
        <Table
            rowKey={'id'}
            key={'barDataTable'}
            dataSource={data}
            columns={[
                {
                    title: 'id',
                    dataIndex: indexBy as string,
                    key: 'add_column',
                    render: (value, record) => (
                        <EditableDiv
                            value={value}
                            key={value}
                            onFinishEditing={(value: string) => {
                                dispatch(
                                    setData({
                                        index: data.indexOf(record),
                                        key: indexBy as string,
                                        value,
                                    })
                                );
                            }}
                        />
                    ),
                },
                ...keys.map((key) => {
                    return {
                        key,
                        dataIndex: key,
                        title: (
                            <Space>
                                <EditableDiv
                                    key={key}
                                    value={key}
                                    validate={(value: string) => keys.filter((item) => item !== key).includes(value)}
                                    onFinishEditing={(value: string) => {
                                        if (keys.filter((item) => item !== key).includes(value)) {
                                            message.error(`${value} 已存在`);
                                            return;
                                        } else {
                                            dispatch(setKey({key, newKey: value}));
                                        }
                                    }}
                                />
                                <Button icon={<DeleteOutlined />} onClick={() => dispatch(removeKey(key))}></Button>
                            </Space>
                        ),
                        render: (value, record) => {
                            return (
                                <EditableDiv
                                    value={value}
                                    key={value}
                                    onFinishEditing={(value: number) => {
                                        dispatch(
                                            setData({
                                                index: data.indexOf(record),
                                                key,
                                                value,
                                            })
                                        );
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
                                dispatch(addKey(cryptoRandomString({length: 4})));
                            }}
                        >
                            {t('Add column')}
                        </Button>
                    ),
                    key: 'add_column',
                },
            ]}
        ></Table>
    );
}
