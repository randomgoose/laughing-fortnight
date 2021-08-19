import {Button, Form, InputNumber} from 'antd';
import * as React from 'react';
// import {useDispatch} from 'react-redux';
import {generateIncreasingNumberSequence} from '../../utils/generateNumbers';

export default function DataMock() {
    return (
        <div className={'data-mock'}>
            <Form
                layout={'inline'}
                initialValues={{
                    min: 0,
                    max: 1000,
                    count: 12,
                }}
            >
                <Form.Item name={'min'} label={'最小值'}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'max'} label={'最大值'}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'count'} label={'数组长度'}>
                    <InputNumber />
                </Form.Item>
            </Form>
            <Button
                onClick={() => {
                    console.log(generateIncreasingNumberSequence(10, 100, 1));
                }}
            >
                Random
            </Button>
        </div>
    );
}
