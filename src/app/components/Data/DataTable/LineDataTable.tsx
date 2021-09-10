import {PlusOutlined} from '@ant-design/icons';
import {Table, Tabs, Button} from 'antd';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSerieId, setData, addValue} from '../../../features/chart/lineChartSlice';
import {RootState} from '../../../redux/store';
import EditableDiv from '../../CustomInput/EditableDiv';

export default function LineDataTable() {
    const {data} = useSelector((state: RootState) => state.line);
    const dispatch = useDispatch();

    return (
        <Tabs
            type={'editable-card'}
            onEdit={(targetKey, action) => {
                console.log(targetKey, action);
            }}
        >
            {data.map((item, index) => (
                <Tabs.TabPane
                    key={item.id}
                    tab={
                        <EditableDiv
                            value={item.id}
                            onFinishEditing={(value: string) => dispatch(setSerieId({id: item.id, newId: value}))}
                        />
                    }
                >
                    <Table
                        size={'small'}
                        pagination={{pageSize: 5}}
                        dataSource={item.data}
                        columns={['x', 'y'].map((key) => {
                            return {
                                key,
                                dataIndex: key,
                                title: key,
                                render: (value: number, record) => (
                                    <EditableDiv
                                        value={value}
                                        key={value}
                                        onFinishEditing={(value: number) => {
                                            dispatch(
                                                setData({
                                                    serieIndex: index,
                                                    datumIndex: item.data.indexOf(record),
                                                    key: key,
                                                    value,
                                                })
                                            );
                                        }}
                                    />
                                ),
                            };
                        })}
                        footer={() => (
                            <Button
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    dispatch(addValue(item.id));
                                }}
                            >
                                新增
                            </Button>
                        )}
                    ></Table>
                </Tabs.TabPane>
            ))}
        </Tabs>
    );
}
