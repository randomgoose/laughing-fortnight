import * as React from 'react';
import {Checkbox, Space, Table, Upload} from 'antd';
import Header from '../Typography/Header';
import {useDispatch, useSelector} from 'react-redux';
import {setDataSource} from '../../features/app/appSlice';
import {parse} from 'csv';
import {useImmer} from 'use-immer';
import {RootState} from '../../redux/store';
import {setNewData} from '../../features/chart/lineChartSlice';

export default function DataUpload() {
    const dispatch = useDispatch();

    const {data} = useSelector((state: RootState) => state.line);
    console.log(data);

    const [tempData, setTempData] = useImmer([]);
    const [tempColumns, setTempColumns] = useImmer([]);
    const [dataLoaded, setDataLoaded] = useImmer(false);

    const readFile = (file: File) => {
        switch (file.type) {
            case 'text/csv':
                return readCSV(file);
            default:
                return file;
        }
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
                                            <Checkbox />
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
                    const columns = Object.keys(output[0]);

                    dispatch(
                        setNewData(
                            columns.map((column) => {
                                return {
                                    id: column,
                                    data: output.map((p, i) => {
                                        return {x: i, y: p[column]};
                                    }),
                                };
                            })
                        )
                    );
                    setTempData(output);
                }
            );

            setDataLoaded(true);
        };
        reader.readAsText(file);

        // Prevent upload
        return false;
    };

    return (
        <div className={'DataUpload'}>
            <Header
                showReturnButton
                onReturn={() => {
                    dispatch(setDataSource(null));
                }}
            >
                上传数据
            </Header>
            {dataLoaded ? (
                <Table dataSource={tempData} columns={tempColumns} pagination={{pageSize: 5}} />
            ) : (
                <Upload.Dragger name={'file'} accept={'.json, .csv'} beforeUpload={readFile}>
                    <p>点击或将文件拖拽至此处上传</p>
                    <p style={{color: 'gray'}}>支持格式 .json/.csv </p>
                </Upload.Dragger>
            )}
        </div>
    );
}
