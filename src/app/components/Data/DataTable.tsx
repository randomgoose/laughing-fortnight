import {PlusOutlined} from '@ant-design/icons';
import {Table, Tabs, Button} from 'antd';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setData, setNewData} from '../../features/chart/lineChartSlice';
import {RootState} from '../../redux/store';
import EditableDiv from '../EditableDiv';

export default function DataTable() {
    const {data} = useSelector((state: RootState) => state.line);

    const dispatch = useDispatch();
    return (
        <Tabs type={'card'}>
            {data.map((item, index) => (
                <Tabs.TabPane key={item.id} tab={item.id}>
                    <Table
                        size={'small'}
                        pagination={{pageSize: 5}}
                        dataSource={item.data}
                        columns={Object.keys(item.data[0]).map((key) => {
                            return {
                                key,
                                dataIndex: key,
                                title: key,
                                render: (value: number, record) => (
                                    <EditableDiv
                                        value={value}
                                        key={value}
                                        onFinishEditing={(value) => {
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
                                    dispatch(setNewData([...data, data[0]]));
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
