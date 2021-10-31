import * as React from 'react';
import {Button, Table, Tabs} from 'antd';
import {Param} from '../../../atoms/appAtom';
import {useScatter} from '../../../hooks/useScatter';
import {useTranslation} from 'react-i18next';
import {DeleteOutlined} from '@ant-design/icons';

export default function ScatterDataTable({id}: Param) {
    const {scatter, addPoint} = useScatter(id);
    const {t} = useTranslation();

    return (
        <Tabs type={'card'}>
            {scatter.data &&
                scatter.data.map((datum) => {
                    console.log(datum);
                    return (
                        <Tabs.TabPane tab={datum.id} tabKey={datum.id + ''} key={datum.id + ''}>
                            <Table
                                dataSource={datum.data}
                                scroll={{y: 140}}
                                columns={[
                                    {
                                        dataIndex: 'x',
                                        title: 'x',
                                    },
                                    {
                                        dataIndex: 'y',
                                        title: 'y',
                                    },
                                    {
                                        dataIndex: 'id',
                                        title: t('Action'),
                                        render: () => <Button icon={<DeleteOutlined />} />,
                                    },
                                ]}
                                footer={() => (
                                    <Button
                                        onClick={() => {
                                            addPoint(datum.id + '', Math.random() * 100, Math.random() * 100);
                                        }}
                                    >
                                        {t('Add row')}
                                    </Button>
                                )}
                            />
                        </Tabs.TabPane>
                    );
                })}
        </Tabs>
    );
}
