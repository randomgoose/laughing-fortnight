// import {Serie} from '@nivo/line';
import {Button, Form, InputNumber, Radio} from 'antd';
import * as React from 'react';
import {useImmer} from 'use-immer';
// import {useDispatch} from 'react-redux';
import {generateDecreasingNumberSequence, generateIncreasingNumberSequence} from '../../utils/generateNumbers';
import cryptoRandomString from 'crypto-random-string';
import {Serie} from '@nivo/line';
import {useDispatch} from 'react-redux';
import {setNewData} from '../../features/chart/lineChartSlice';
import {FallOutlined, RiseOutlined} from '@ant-design/icons';

export default function DataMock() {
    const dispatch = useDispatch();
    const [numberSequenceAttr, setNumberSequenceAttr] = useImmer<{
        min: number;
        max: number;
        count: number;
        array: number;
        trend: 'rise' | 'fall' | 'normal-distribution';
    }>({
        min: 0,
        max: 1000,
        count: 12,
        array: 1,
        trend: 'rise',
    });

    const [tempData, setTempData] = useImmer<Serie[]>([]);

    const generateNumberSequence = React.useCallback(() => {
        const {count, max, min, trend} = numberSequenceAttr;
        if (trend === 'rise') {
            return generateIncreasingNumberSequence(count, max, min).map((num, index) => {
                return {x: index, y: num};
            });
        } else {
            return generateDecreasingNumberSequence(count, max, min).map((num, index) => {
                return {x: index, y: num};
            });
        }
    }, [numberSequenceAttr]);

    React.useEffect(() => {
        if (tempData.length > 0) dispatch(setNewData(tempData));
    }, [tempData]);

    return (
        <div className={'data-mock'}>
            <Form
                layout={'inline'}
                initialValues={numberSequenceAttr}
                onValuesChange={(changedValues) => {
                    setNumberSequenceAttr((draftState) => {
                        return Object.assign(draftState, changedValues);
                    });
                }}
            >
                <Form.Item name={'min'} label={'最小值'} fieldKey={'min'}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'max'} label={'最大值'} fieldKey={'max'}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'count'} label={'数组长度'} fieldKey={'count'}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'array'} label={'数组数'} fieldKey={'array'}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'trend'} label={'趋势'} fieldKey={'trend'}>
                    <Radio.Group
                        optionType={'button'}
                        options={[
                            {label: <RiseOutlined />, value: 'rise'},
                            {label: <FallOutlined />, value: 'fall'},
                            {label: 'Normal Distribution', value: 'normal-distribution'},
                        ]}
                    ></Radio.Group>
                </Form.Item>
            </Form>
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
                Random
            </Button>
        </div>
    );
}
