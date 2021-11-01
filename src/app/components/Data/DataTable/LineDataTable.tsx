import {DeleteOutlined, EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';
import {Button, message, Table} from 'antd';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useLine} from '../../../hooks/useLine';
import EditableDiv from '../../CustomInput/EditableDiv';
import DataMock from '../DataMock/DataMock';

export default function LineDataTable({id}: {id: string}) {
    const {line, setSerieValue, setSerieId, setPartialState, removeSerieById, addSerie, updateTick} = useLine(id);
    const {t} = useTranslation();

    const newData = line.data
        .map((datum) =>
            datum.data.map((d) => ({
                [datum.id]: d.y,
                x: d.x,
            }))
        )
        .reduce((a, b) =>
            a.map((item, i) => {
                if (item.x === b[i].x) {
                    return Object.assign({}, item, b[i]);
                }
            })
        );

    return (
        <>
            <DataMock />
            <Table
                size={'small'}
                scroll={{y: 140, x: 2000}}
                dataSource={newData}
                rowKey={'x'}
                columns={[
                    {
                        dataIndex: 'x',
                        title: 'x',
                        fixed: 'left',
                        render: (value) => (
                            <EditableDiv
                                value={value + ''}
                                onFinishEditing={(tick: string) => {
                                    if ((tick + '').length < 0) {
                                        message.error('Cannot leave this field empty');
                                        return;
                                    }
                                    //TODO: 解决重复问题
                                    updateTick(value, tick);
                                }}
                            />
                        ),
                    },
                    ...line.data.map((datum, index) => ({
                        dataIndex: datum.id,
                        title: (
                            <div className={'flex items-center gap-2'}>
                                <EditableDiv
                                    value={datum.id}
                                    onFinishEditing={(value: string) => {
                                        if (value.length <= 0) {
                                            message.error(t('Cannot leave this field empty'));
                                            return;
                                        }
                                        setSerieId(datum.id as string, value);
                                    }}
                                />
                                <Button
                                    icon={line.lines.includes(datum.id) ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                    onClick={() => {
                                        line.lines.includes(datum.id)
                                            ? setPartialState({lines: line.lines.filter((id) => id !== datum.id)})
                                            : setPartialState({lines: [...line.lines, datum.id]});
                                    }}
                                />
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                        removeSerieById(datum.id + '');
                                    }}
                                />
                            </div>
                        ),
                        render: (value, record) => (
                            <EditableDiv
                                value={parseFloat(value)}
                                key={value}
                                onFinishEditing={(value: number) => {
                                    setSerieValue(index, newData.indexOf(record), 'y', value);
                                }}
                            />
                        ),
                    })),
                    {
                        dataIndex: 'x',
                        title: () => <Button onClick={addSerie}>{t('Add column')}</Button>,
                        render: () => null,
                    },
                ]}
                footer={() => <Button></Button>}
            ></Table>
        </>
        // <Tabs
        //     type={'editable-card'}
        //     onEdit={(targetKey, action) => {
        //         console.log(targetKey, action)
        //     }}
        // >
        //     {data.map((item, index) => (
        //         <Tabs.TabPane
        //             key={item.id}
        //             tab={
        //                 <EditableDiv
        //                     value={item.id}
        //                     onFinishEditing={(value: string) => dispatch(setSerieId({ id: item.id, newId: value }))}
        //                 />
        //             }
        //         >
        //             <Table
        //                 rowKey={(record) => record.x as string}
        //                 scroll={{ y: 100 }}
        //                 size={'small'}
        //                 pagination={{ pageSize: 5 }}
        //                 dataSource={item.data}
        //                 columns={['x', 'y'].map((key) => {
        //                     return {
        //                         key,
        //                         dataIndex: key,
        //                         title: key,
        //                         render: (value: number, record) => (
        //                             <EditableDiv
        //                                 value={value}
        //                                 key={value}
        //                                 onFinishEditing={(value: number) => {
        //                                     dispatch(
        //                                         setData({
        //                                             serieIndex: index,
        //                                             datumIndex: item.data.indexOf(record),
        //                                             key: key,
        //                                             value,
        //                                         })
        //                                     )
        //                                 }}
        //                             />
        //                         ),
        //                     }
        //                 })}
        //                 footer={() => (
        //                     <Button
        //                         icon={<PlusOutlined />}
        //                         onClick={() => {
        //                             dispatch(addValue(item.id))
        //                         }}
        //                     >
        //                         {t('Add entry')}
        //                     </Button>
        //                 )}
        //             ></Table>
        //         </Tabs.TabPane>
        //     ))}
        // </Tabs>
    );
}
