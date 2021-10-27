import * as React from 'react';
import {Table} from 'antd';
import {useRecoilState} from 'recoil';
import {pieStateFamily} from '../../../atoms/pieStateFamily';
import {useTranslation} from 'react-i18next';
import EditableDiv from '../../CustomInput/EditableDiv';

export default function PieDataTable({id}: {id: string}) {
    const [pie] = useRecoilState(pieStateFamily(id));
    const {t} = useTranslation();

    const columns = [
        {dataIndex: 'id', title: t('ID')},
        {dataIndex: 'label', title: t('Label')},
        {
            dataIndex: 'value',
            title: t('Value'),
            render: (value) => <EditableDiv value={value} />,
        },
    ];

    return <Table dataSource={pie.data} columns={columns}></Table>;
}
