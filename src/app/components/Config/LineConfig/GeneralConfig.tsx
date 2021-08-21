import * as React from 'react';
import {Space, Slider, Select, Form, Switch} from 'antd';
import Label from '../../Typography/Label';
import MarginInput from '../../MarginInput';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setColorScheme, setScale} from '../../../features/chart/lineChartSlice';
import {colorSchemes} from '@nivo/colors';
import {AreaChartOutlined, ColumnWidthOutlined, GatewayOutlined, HighlightOutlined} from '@ant-design/icons';

const colorSchemeList = Object.keys(colorSchemes);

export default function GeneralConfig() {
    const dispatch = useDispatch();
    const {scale, colors, enableArea, margin} = useSelector((state: RootState) => state.line);

    function dispatchSetColorScheme(value) {
        dispatch(setColorScheme(value));
    }

    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout={'vertical'}
            onFieldsChange={() => {
                console.log(form.getFieldsValue());
            }}
            initialValues={{
                scale: scale,
                colorScheme: colors['scheme'],
                margin: margin,
                enableArea: enableArea,
            }}
        >
            <Form.Item
                label={
                    <Space>
                        <GatewayOutlined />
                        <Label>尺寸</Label>
                    </Space>
                }
                name={'scale'}
            >
                <Slider min={0.3} max={20} step={0.01} onChange={(value: number) => dispatch(setScale(value))} />
            </Form.Item>
            <Form.Item
                label={
                    <Space>
                        <HighlightOutlined />
                        <Label>颜色</Label>
                    </Space>
                }
                name={'colorScheme'}
            >
                <Select style={{width: '100%'}} onChange={dispatchSetColorScheme}>
                    {colorSchemeList.map((scheme) => (
                        <Select.Option key={scheme} value={scheme}>
                            {scheme}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label={
                    <Space>
                        <ColumnWidthOutlined />
                        <Label>边距</Label>
                    </Space>
                }
                name={'margin'}
            >
                <MarginInput />
            </Form.Item>
            <Form.Item
                label={
                    <Space>
                        <AreaChartOutlined />
                        <Label>面积图</Label>
                    </Space>
                }
                name={'enableArea'}
            >
                <Switch size={'small'} />
            </Form.Item>
        </Form>
    );
}
