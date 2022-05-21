import * as React from 'react';
import {Button, message, Table} from 'antd';
import {useImmerAtom} from 'jotai/immer';
import {useTranslation} from 'react-i18next';
import EditableDiv from '../../CustomInput/EditableDiv';
import {pieAtomFamily} from '../../../atoms/pieAtomFamily';
import {Param} from '../../../atoms/appAtom';
import {usePie} from '../../../hooks/usePie';
import {DeleteOutlined} from '@ant-design/icons';

export default function PieDataTable({id}: Param) {
    const [pie, setPie] = useImmerAtom(pieAtomFamily({id}));
    const {t} = useTranslation();
    const {addArc, removeArcById, changeArcValueById} = usePie(id);

    const columns = [
        {
            dataIndex: 'id',
            title: t('ID'),
            render: (value, record) => (
                <EditableDiv
                    value={value}
                    onFinishEditing={(value) => {
                        if ((value + '').length <= 0) {
                            message.error('Cannot leave this field empty');
                            return;
                        }
                        if (pie.data.some((datum) => datum.id === value + '')) {
                            message.error(`${value} exists.`);
                            return;
                        }
                        setPie((pie) => {
                            const datum = pie.data.find((i) => i.id === record.id);
                            if (datum) datum.id = value as string;
                        });
                    }}
                />
            ),
        },
        {
            dataIndex: 'label',
            title: t('Label'),
            render: (value: string, record) => (
                <EditableDiv
                    value={value}
                    onFinishEditing={(value) => {
                        setPie((pie) => {
                            const datum = pie.data.find((i) => i.id === record.id);
                            if (datum) datum.label = value as string;
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
                        changeArcValueById(record.id, value as unknown as number);
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
            <Table
                rowKey={'id'}
                dataSource={pie.data}
                columns={columns}
                scroll={{y: 140}}
                footer={() => <Button onClick={addArc}>{t('Add Row')}</Button>}
            />
        </>
    );
}
