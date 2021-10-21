//@ts-nocheck
import {PlusOutlined} from '@ant-design/icons';
import {Table, Tabs, Button} from 'antd';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {setSerieId, setData, addValue} from '../../../features/chart/lineChartSlice';
import {RootState} from '../../../redux/store';
import EditableDiv from '../../CustomInput/EditableDiv';

export default function LineDataTable() {
    const {data} = useSelector((state: RootState) => state.line);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const newData = data
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
        <Table
            size={'small'}
            scroll={{y: 120}}
            dataSource={newData}
            columns={[
                {
                    dataIndex: 'x',
                    title: 'x',
                },
                ...data.map((datum, index) => ({
                    dataIndex: datum.id,
                    title: (
                        <EditableDiv
                            value={datum.id}
                            onFinishEditing={(value: string) => dispatch(setSerieId({id: datum.id, newId: value}))}
                        />
                    ),
                    render: (value, record) => (
                        <EditableDiv
                            value={parseFloat(value)}
                            key={value}
                            onFinishEditing={(value: number) => {
                                dispatch(
                                    setData({
                                        serieIndex: index,
                                        datumIndex: newData.indexOf(record),
                                        key: 'y',
                                        value,
                                    })
                                );
                            }}
                        />
                    ),
                })),
            ]}
        ></Table>
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
