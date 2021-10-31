import * as React from 'react';
import {Button, Table} from 'antd';
import {useImmerAtom} from 'jotai/immer';
import {useTranslation} from 'react-i18next';
import EditableDiv from '../../CustomInput/EditableDiv';
import {pieAtomFamily} from '../../../atoms/pieAtomFamily';
import {Param} from '../../../atoms/appAtom';
import {usePie} from '../../../hooks/usePie';
import {DeleteOutlined} from '@ant-design/icons';
import DataMock from '../DataMock/DataMock';

export default function PieDataTable({id}: Param) {
    const [pie, setPie] = useImmerAtom(pieAtomFamily({id}));
    const {t} = useTranslation();
    const {addArc, removeArcById, changeArcValueById} = usePie(id);

    const columns = [
        {dataIndex: 'id', title: t('ID')},
        {
            dataIndex: 'label',
            title: t('Label'),
            render: (value: string, record) => (
                <EditableDiv
                    value={value}
                    onFinishEditing={(value) => {
                        setPie((pie) => {
                            pie.data.find((i) => i.id === record.id).label = value as string;
                        });
                    }}
                />
            ),
        },
        {
            dataIndex: 'value',
            title: t('Value'),
            render: (value: number, record) => (
                <EditableDiv
                    value={value}
                    onFinishEditing={(value) => {
                        changeArcValueById(record.id, value as number);
                    }}
                />
            ),
        },
        {
            dataIndex: 'id',
            title: t('Action'),
            render: (value: string) => (
                <Button
                    type={'ghost'}
                    icon={
                        <DeleteOutlined
                            onClick={() => {
                                removeArcById(value);
                            }}
                        />
                    }
                />
            ),
        },
    ];

    return (
        <>
            <DataMock />
            <Table
                rowKey={'id'}
                dataSource={pie.data}
                columns={columns}
                scroll={{y: 160}}
                footer={() => <Button onClick={addArc}>{t('Add Row')}</Button>}
            />
        </>
    );
}
