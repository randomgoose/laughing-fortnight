// import {Serie} from '@nivo/line';
import {Button, Drawer, Form, InputNumber, Radio, Space} from 'antd';
import * as React from 'react';
import {useImmer} from 'use-immer';
// import {useDispatch} from 'react-redux';
import {generateDatumSequence, generateNumberSequence, Trend} from '../../../utils/generateNumbers';
import cryptoRandomString from 'crypto-random-string';
import {Serie} from '@nivo/line';
import {useDispatch, useSelector} from 'react-redux';
import {setNewData} from '../../../features/chart/lineChartSlice';
import {FallOutlined, RiseOutlined} from '@ant-design/icons';
import Header from '../../Typography/Header';
import {setDataSource} from '../../../features/app/appSlice';
import {RootState} from '../../../redux/store';
import {setPartialState} from '../../../features/chart/barChartSlice';
import AdvancedConfig from './AdvancedConfig';

export default function DataMock() {
    const dispatch = useDispatch();
    const {chartType} = useSelector((state: RootState) => state.app);
    const [showAdvancedSettings, setShowAdvancedSettings] = React.useState(false);
    const {decimalDigit} = useSelector((state: RootState) => state.dataMock);
    const [numberSequenceAttr, setNumberSequenceAttr] = useImmer<{
        min: number;
        max: number;
        length: number;
        count: number;
        trend: Trend;
        decimalDigit: number;
    }>({
        min: 0,
        max: 1000,
        length: 12,
        count: 1,
        trend: 'rise',
        decimalDigit: decimalDigit,
    });

    React.useEffect(() => {
        setNumberSequenceAttr({...numberSequenceAttr, decimalDigit});
    }, [decimalDigit]);

    const [tempData, setTempData] = useImmer<Serie[]>([]);

    React.useEffect(() => {
        if (tempData.length > 0) {
            switch (chartType) {
                case 'line':
                    dispatch(setNewData(tempData));
                    break;
                case 'bar':
                    dispatch(setPartialState({data: tempData, keys: ['a', 'b', 'c'], indexBy: 'a'}));
                    break;
                default:
                    return;
            }
        }
    }, [tempData]);

    return (
        <div className={'data-mock'} style={{marginBottom: 8}}>
            <Space direction={'vertical'}>
                <Header showReturnButton onReturn={() => dispatch(setDataSource(null))}>
                    数据模拟
                </Header>
                <Form
                    layout={'inline'}
                    initialValues={numberSequenceAttr}
                    onValuesChange={(changedValues) => {
                        setNumberSequenceAttr((draftState) => {
                            return Object.assign(draftState, changedValues);
                        });
                    }}
                >
                    <Form.Item name={'trend'} label={'趋势'} fieldKey={'trend'}>
                        <Radio.Group
                            optionType={'button'}
                            options={[
                                {label: <RiseOutlined />, value: 'rise'},
                                {label: <FallOutlined />, value: 'fall'},
                                // {label: 'Normal Distribution', value: 'normal-distribution'},
                            ]}
                        ></Radio.Group>
                    </Form.Item>

                    <Form.Item name={'min'} label={'最小值'} fieldKey={'min'}>
                        <InputNumber style={{maxWidth: 48}} />
                    </Form.Item>
                    <Form.Item name={'max'} label={'最大值'} fieldKey={'max'}>
                        <InputNumber style={{maxWidth: 48}} />
                    </Form.Item>

                    <Form.Item name={'length'} label={'数组长度'} fieldKey={'length'}>
                        <InputNumber style={{maxWidth: 48}} />
                    </Form.Item>
                    <Form.Item name={'count'} label={'数组数'} fieldKey={'count'}>
                        <InputNumber style={{maxWidth: 36}} />
                    </Form.Item>
                </Form>
                <Space size={4}>
                    <Button
                        onClick={() => {
                            const {count} = numberSequenceAttr;
                            let temp = [];
                            switch (chartType) {
                                case 'line':
                                    for (let i = 0; i < count; i++) {
                                        const serie: Serie = {
                                            id: cryptoRandomString({length: 4}),
                                            data: generateNumberSequence(numberSequenceAttr),
                                        };
                                        temp.push(serie);
                                    }
                                    break;
                                case 'bar':
                                    temp = [
                                        ...generateDatumSequence({
                                            attrs: ['a', 'b', 'c'],
                                            length: count,
                                            min: 1,
                                            max: 10,
                                            decimalDigit: decimalDigit,
                                        }),
                                    ];
                                    break;
                            }
                            setTempData(temp);
                        }}
                    >
                        模拟数据
                    </Button>
                    <Button type={'link'} onClick={() => setShowAdvancedSettings(true)}>
                        高级设置
                    </Button>
                    <Drawer
                        title="Basic Drawer"
                        placement="right"
                        onClose={() => setShowAdvancedSettings(false)}
                        visible={showAdvancedSettings}
                    >
                        <AdvancedConfig />
                    </Drawer>
                </Space>
            </Space>
        </div>
    );
}
