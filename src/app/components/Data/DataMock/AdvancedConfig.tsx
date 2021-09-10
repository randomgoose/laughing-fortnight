import * as React from 'react';
import {Form, InputNumber} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setPartialState} from '../../../features/data/dataMockSlice';

export default function AdvancedConfig() {
    const {decimalDigit} = useSelector((state: RootState) => state.dataMock);
    const dispatch = useDispatch();

    return (
        <Form
            initialValues={{decimalDigit}}
            onValuesChange={(changedValues) => {
                dispatch(setPartialState(changedValues));
            }}
        >
            <Form.Item name={'decimalDigit'} label={'小数位'}>
                <InputNumber min={0} />
            </Form.Item>
        </Form>
    );
}
