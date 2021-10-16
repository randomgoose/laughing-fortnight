import * as React from 'react';
import {Form, Input, Space} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import Header from '../../Typography/Header';
import {setData, setPartialState} from '../../../features/chart/barChartSlice';
import ConfigPage from '../ConfigPage';
import {useForm} from 'antd/lib/form/Form';
import {useDebounceFn} from 'ahooks';
import {useTranslation} from 'react-i18next';

export default function BarConfig() {
    const {activeDatum} = useSelector((state: RootState) => state.bar);
    const dispatch = useDispatch();
    const [form] = useForm(null);
    const {t} = useTranslation();

    React.useEffect(() => {
        form.setFieldsValue({
            value: activeDatum.value,
        });
    }, [activeDatum]);

    const {run} = useDebounceFn(
        (values) => {
            dispatch(setData({index: activeDatum.index, key: activeDatum.id as string, value: values['value']}));
        },
        {
            wait: 500,
        }
    );

    return (
        <ConfigPage style={{padding: 12}}>
            <Header showReturnButton onReturn={() => dispatch(setPartialState({activeIndex: -1}))}>
                {t('Mock Data')}
            </Header>
            <Form
                className={'BarConfig'}
                initialValues={{value: activeDatum.value}}
                form={form}
                onValuesChange={(values) => {
                    run(values);
                }}
            >
                <Form.Item
                    name={'value'}
                    label={
                        <Space>
                            <div style={{width: 8, height: 8, background: activeDatum.color, borderRadius: 1}}></div>
                            {`${activeDatum.indexValue} ${activeDatum.id}`}
                        </Space>
                    }
                >
                    <Input></Input>
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
