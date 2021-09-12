import * as React from 'react';
import ConfigPage from '../ConfigPage';
import {FcSettings} from 'react-icons/fc';
import {Form, Radio, Select, Slider, Space, Switch} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setPartialState} from '../../../features/chart/barChartSlice';
import MarginInput from '../../CustomInput/MarginInput';
import {HighlightOutlined} from '@ant-design/icons';
import {colorSchemes} from '@nivo/colors';

const colorSchemeList = Object.keys(colorSchemes);

export default function GeneralConfig() {
    const {groupMode, layout, margin, padding, innerPadding, colors} = useSelector((state: RootState) => state.bar);
    const dispatch = useDispatch();

    React.useEffect(() => {}, [groupMode]);

    return (
        <ConfigPage title={'通用设置'} icon={<FcSettings />}>
            <Form
                layout={'vertical'}
                initialValues={{
                    groupMode,
                    layout,
                    margin,
                    padding,
                    innerPadding,
                    colors: colors['scheme'],
                }}
                onValuesChange={(changedValues) => {
                    if (changedValues.colors) {
                        dispatch(setPartialState({colors: {scheme: changedValues.colors}}));
                    } else if (changedValues.xScale) {
                        dispatch(setPartialState({xScale: {type: changedValues.xScale}}));
                    } else if (changedValues.yScale) {
                        dispatch(setPartialState({yScale: {type: changedValues.yScale}}));
                    } else {
                        dispatch(setPartialState(changedValues));
                    }
                }}
            >
                <Form.Item name="groupMode" label={'分组方式'}>
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
                <Form.Item name="layout" label={'布局方式'}>
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
                <Form.Item name="reverse" valuePropName={'checked'} label={'反向'}>
                    <Switch />
                </Form.Item>
                <Form.Item name="padding" label={'间距'}>
                    <Slider min={0.1} max={0.9} step={0.1} />
                </Form.Item>
                <Form.Item name="innerPadding" label={'柱间距'}>
                    <Slider step={1} max={9} />
                </Form.Item>
                <Form.Item name="margin" label={'边距'}>
                    <MarginInput />
                </Form.Item>
                <Form.Item
                    label={
                        <Space>
                            <HighlightOutlined />
                            颜色
                        </Space>
                    }
                    name={'colors'}
                >
                    <Select style={{width: '100%'}}>
                        {colorSchemeList.map((scheme) => (
                            <Select.Option key={scheme} value={scheme}>
                                {scheme}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
