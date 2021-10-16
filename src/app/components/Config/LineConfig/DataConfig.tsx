import * as React from 'react';
import {Checkbox, Space, Modal, Button, Upload, Table, Typography} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {addKey, removeKey, setNewData} from '../../../features/chart/lineChartSlice';
import * as parse from 'csv-parse';
import DataTable from '../../Data/DataTable';
import {FcDatabase} from 'react-icons/fc';
import {useTranslation} from 'react-i18next';

export const DataUtil = () => {
    const {t} = useTranslation();

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

    const readCSV = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            parse(
                e.target.result as string,
                {
                    comment: '#',
                    columns: (header) => {
                        setTempColumns(
                            header.map((item) => {
                                return {
                                    title: (
                                        <Space>
                                            {item}
                                            <Button size={'small'}>x</Button>
                                        </Space>
                                    ),
                                    dataIndex: item,
                                };
                            })
                        );
                        return header;
                    },
                },
                function (err, output) {
                    if (err) console.log(err);
                    setTempData(output);
                }
            );

            setDataLoaded(true);
        };
        reader.readAsText(file);

        // Prevent upload
        return false;
    };

    const readFile = (file: File) => {
        switch (file.type) {
            case 'text/csv':
                return readCSV(file);
            default:
                return file;
        }
    };

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isImportModalVisible, setIsImportModalVisible] = React.useState(false);
    const [dataLoaded, setDataLoaded] = React.useState(false);
    const [tempData, setTempData] = React.useState([]);
    const [tempColumns, setTempColumns] = React.useState([]);
    const dispatch = useDispatch();

    return (
        <>
            <Modal
                centered={true}
                visible={isModalVisible}
                title={t('Data')}
                onCancel={hideModal}
                onOk={() => {
                    dispatch(setNewData(tempData));
                    // hideModal();
                }}
            >
                <DataTable />
            </Modal>
            <Modal
                onCancel={hideImportaModal}
                onOk={hideImportaModal}
                title={t('Import Data')}
                visible={isImportModalVisible}
                width={'fit-content'}
            >
                {dataLoaded ? (
                    <Table dataSource={tempData} columns={tempColumns} pagination={{pageSize: 5}} />
                ) : (
                    <Upload.Dragger name={'file'} accept={'.json, .csv'} beforeUpload={readFile} style={{width: 428}}>
                        <p>点击或将文件拖拽至此处上传</p>
                        <p>支持格式 .json/.csv </p>
                    </Upload.Dragger>
                )}
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
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcDatabase />
                    数据设置
                </Space>
            </Typography.Title>
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
            <DataUtil />
        </Space>
    );
};
