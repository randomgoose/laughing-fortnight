import * as React from 'react';
import ConfigPage from '../ConfigPage';
import {FcSettings} from 'react-icons/fc';
import {Form, Radio, Slider, Switch} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setPartialState} from '../../../features/chart/barChartSlice';
import MarginInput from '../../CustomInput/MarginInput';

export default function GeneralConfig() {
    const {groupMode, layout, margin, padding, innerPadding} = useSelector((state: RootState) => state.bar);
    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log(groupMode);
    }, [groupMode]);

    return (
        <ConfigPage title={'通用设置'} icon={<FcSettings />}>
            <Form
                initialValues={{
                    groupMode,
                    layout,
                    margin,
                    padding,
                    innerPadding,
                }}
                onValuesChange={(changedValues) => {
                    dispatch(setPartialState(changedValues));
                }}
            >
                <Form.Item name="groupMode">
                    <Radio.Group
                        options={[
                            {
                                value: 'grouped',
                                label: '分组',
                            },
                            {value: 'stacked', label: '堆叠'},
                        ]}
                        optionType={'button'}
                    />
                </Form.Item>
                <Form.Item name="layout">
                    <Radio.Group
                        options={[
                            {
                                value: 'horizontal',
                                label: '横向',
                            },
                            {value: 'vertical', label: '纵向'},
                        ]}
                        optionType={'button'}
                    />
                </Form.Item>
                <Form.Item name="reverse" valuePropName={'checked'}>
                    <Switch />
                </Form.Item>
                <Form.Item name="padding">
                    <Slider min={0.1} max={0.9} step={0.1} />
                </Form.Item>
                <Form.Item name="innerPadding">
                    <Slider step={1} max={9} />
                </Form.Item>
                <Form.Item name="margin">
                    <MarginInput />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
