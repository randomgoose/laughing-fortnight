import * as React from 'react';
import {Checkbox, Space, Modal, Tabs, Table, Button, Upload} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import EditableDiv from '../../EditableDiv';
import {addKey, removeKey, setData, setNewData} from '../../../features/chart/lineChartSlice';
import {PlusOutlined} from '@ant-design/icons';

const DataTable = () => {
    const {data} = useSelector((state: RootState) => state.line);
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const showImportModal = () => {
        setIsImportModalVisible(true);
    };

    const hideImportaModal = () => {
        setIsImportModalVisible(false);
    };

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isImportModalVisible, setIsImportModalVisible] = React.useState(false);

    return (
        <>
            <Modal visible={isModalVisible} title={'数据'} onCancel={hideModal} onOk={hideModal}>
                <Tabs>
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
            </Modal>
            <Modal
                onCancel={hideImportaModal}
                onOk={hideImportaModal}
                title={'导入数据'}
                visible={isImportModalVisible}
            >
                <Upload.Dragger name={'file'}>
                    <p>点击或将文件拖拽至此处上传</p>
                    <p>支持格式 .json/.csv </p>
                </Upload.Dragger>
            </Modal>
            <Button onClick={showModal} block type={'primary'}>
                编辑数据
            </Button>
            <Button onClick={showImportModal} block>
                导入数据
            </Button>
        </>
    );
};

export default () => {
    const dispatch = useDispatch();
    const {data, lines} = useSelector((state: RootState) => state.line);
    return (
        <Space direction={'vertical'}>
            {data.map((item) => (
                <Checkbox
                    value={item.id}
                    checked={lines.find((line) => line === item.id) ? true : false}
                    key={item.id}
                    onChange={(e) => {
                        e.target.checked ? dispatch(addKey(item.id)) : dispatch(removeKey(item.id));
                    }}
                >
                    {item.id}
                </Checkbox>
            ))}
            <DataTable />
        </Space>
    );
};
