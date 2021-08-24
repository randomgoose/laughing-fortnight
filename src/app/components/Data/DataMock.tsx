// import {Serie} from '@nivo/line';
import {Button, Form, InputNumber, Radio} from 'antd';
import * as React from 'react';
import {useImmer} from 'use-immer';
// import {useDispatch} from 'react-redux';
import {
    generateDecreasingNumberSequence,
    generateGaussianSequence,
    generateIncreasingNumberSequence,
} from '../../utils/generateNumbers';
import cryptoRandomString from 'crypto-random-string';
import {Serie} from '@nivo/line';
import {useDispatch} from 'react-redux';
import {setNewData} from '../../features/chart/lineChartSlice';
import {FallOutlined, RiseOutlined} from '@ant-design/icons';
import Header from '../Typography/Header';
import {setDataSource} from '../../features/app/appSlice';

export default function DataMock() {
    const dispatch = useDispatch();
    const [numberSequenceAttr, setNumberSequenceAttr] = useImmer<
        Partial<{
            min: number;
            max: number;
            count: number;
            array: number;
            mean: number;
            std: number;
            trend: 'rise' | 'fall' | 'normal-distribution';
        }>
    >({
        min: 0,
        max: 1000,
        count: 12,
        array: 1,
        trend: 'rise',
    });

    const [tempData, setTempData] = useImmer<Serie[]>([]);

    const generateNumberSequence = React.useCallback(() => {
        const {count, max, min, trend, mean, std} = numberSequenceAttr;
        if (trend === 'rise') {
            return generateIncreasingNumberSequence(count, max, min).map((num, index) => {
                return {x: index, y: num};
            });
        } else if (trend === 'fall') {
            return generateDecreasingNumberSequence(count, max, min).map((num, index) => {
                return {x: index, y: num};
            });
        } else {
            return generateGaussianSequence(count, mean, std).map((num, index) => {
                return {x: index, y: num};
            });
        }
    }, [numberSequenceAttr]);

    React.useEffect(() => {
        if (tempData.length > 0) dispatch(setNewData(tempData));
    }, [tempData]);

    return (
        <div className={'data-mock'} style={{marginBottom: 8}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
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
                    {numberSequenceAttr.trend !== 'normal-distribution' ? (
                        <>
                            <Form.Item name={'min'} label={'最小值'} fieldKey={'min'}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name={'max'} label={'最大值'} fieldKey={'max'}>
                                <InputNumber />
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item name={'mean'} label={'均值'} fieldKey={'mean'}>
                                <InputNumber />
                            </Form.Item>
                            <Form.Item name={'std'} label={'标准差'} fieldKey={'std'}>
                                <InputNumber />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item name={'count'} label={'数组长度'} fieldKey={'count'}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name={'array'} label={'数组数'} fieldKey={'array'}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            onClick={() => {
                                const {array} = numberSequenceAttr;
                                let temp = [];
                                for (let i = 0; i < array; i++) {
                                    const serie: Serie = {
                                        id: cryptoRandomString({length: 4}),
                                        data: generateNumberSequence(),
                                    };
                                    temp.push(serie);
                                }
                                setTempData(temp);
                            }}
                        >
                            模拟数据
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type={'link'}>高级设置</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
