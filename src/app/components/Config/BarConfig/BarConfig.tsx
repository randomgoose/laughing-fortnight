import * as React from 'react';
import {Form, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import Header from '../../Typography/Header';
import {setPartialState} from '../../../features/chart/barChartSlice';
import ConfigPage from '../ConfigPage';
import ColorPicker from '../../CustomInput/ColorPicker';
import {hexToRgb} from '../../../utils/hex-to-rgb';
import {useForm} from 'antd/lib/form/Form';

export default function BarConfig() {
    const {data, activeIndex, activeDatum} = useSelector((state: RootState) => state.bar);
    const dispatch = useDispatch();
    const [form] = useForm(null);

    React.useEffect(() => {
        form.setFieldsValue({
            value: activeDatum.value,
        });
    }, [activeDatum]);

    return (
        <ConfigPage style={{padding: 12}}>
            <Header showReturnButton onReturn={() => dispatch(setPartialState({activeIndex: -1}))}>
                数据模拟
            </Header>
            <Form className={'BarConfig'} initialValues={{value: activeDatum.value}} form={form}>
                <Form.Item name={'value'}>
                    <Input></Input>
                </Form.Item>
                {activeIndex >= 0 && data[activeIndex]
                    ? Object.keys(data[activeIndex]).map((key) => <div>{data[activeIndex][key]}</div>)
                    : null}
                <Form.Item name={'color'}>
                    <ColorPicker
                        color={hexToRgb(activeDatum.color)}
                        onChange={(color) => {
                            activeDatum.color = color.hex;
                        }}
                    />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
