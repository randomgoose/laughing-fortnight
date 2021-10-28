import * as React from 'react';
import {Button, Table} from 'antd';
import {useImmerAtom} from 'jotai/immer';
import {useTranslation} from 'react-i18next';
import EditableDiv from '../../CustomInput/EditableDiv';
import {pieAtomFamily} from '../../../atoms/pieAtomFamily';
import cryptoRandomString from 'crypto-random-string';
import {generateRandomHexColor} from '../../../utils/generateRandomHexColor';

export default function PieDataTable({id}: {id: string}) {
    const [pie, setPie] = useImmerAtom(pieAtomFamily({id}));
    const {t} = useTranslation();

    const addRow = () => {
        const name = cryptoRandomString({length: 4});
        setPie((pie) => {
            pie.data.push({value: 100, label: name, id: name, color: generateRandomHexColor()});
        });
    };

    const columns = [
        {dataIndex: 'id', title: t('ID')},
        {
            dataIndex: 'label',
            title: t('Label'),
            render: (value, record) => (
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
            render: (value, record) => (
                <EditableDiv
                    value={value}
                    onFinishEditing={(value) => {
                        setPie((pie) => {
                            pie.data.find((i) => i.id === record.id).value = value as number;
                        });
                    }}
                />
            ),
        },
    ];

    return (
        <Table
            dataSource={pie.data}
            columns={columns}
            scroll={{y: 160}}
            footer={() => <Button onClick={addRow}>{t('Add Row')}</Button>}
        />
    );
}
