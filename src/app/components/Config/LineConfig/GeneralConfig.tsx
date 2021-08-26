import * as React from 'react';
import {Space, Slider, Select, Form, Switch} from 'antd';
import MarginInput from '../../MarginInput';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ChartState, setPartialState} from '../../../features/chart/lineChartSlice';
import {colorSchemes} from '@nivo/colors';
import {AreaChartOutlined, ColumnWidthOutlined, GatewayOutlined, HighlightOutlined} from '@ant-design/icons';

const colorSchemeList = Object.keys(colorSchemes);

const blendModeList = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
];

export default function GeneralConfig() {
    const dispatch = useDispatch();
    const {scale, colors, enableArea, margin, areaBaselineValue, areaOpacity, areaBlendMode} = useSelector(
        (state: RootState) => state.line
    );

    const [form] = Form.useForm();

    React.useEffect(() => {
        console.log(enableArea);
    }, [enableArea]);

    return (
        <Form
            form={form}
            layout={'vertical'}
            onValuesChange={(changedValues: Partial<ChartState>) => {
                if (changedValues.colors) {
                    dispatch(setPartialState({colors: {scheme: changedValues.colors}}));
                } else {
                    dispatch(setPartialState(changedValues));
                }
            }}
            initialValues={{
                scale: scale,
                colors: colors['scheme'],
                margin: margin,
                enableArea: enableArea,
                areaOpacity,
                areaBlendMode,
                areaBaselineValue,
            }}
        >
            <Form.Item
                label={
                    <Space>
                        <GatewayOutlined />
                        尺寸
                    </Space>
                }
                name={'scale'}
            >
                <Slider min={0.3} max={20} step={0.01} />
            </Form.Item>
            {/* //TODO: Check sequential color schemes */}
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
            <Form.Item
                label={
                    <Space>
                        <ColumnWidthOutlined />
                        边距
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
                        面积图
                    </Space>
                }
                name={'enableArea'}
                valuePropName={'checked'}
            >
                <Switch size={'small'} />
            </Form.Item>
            <Form.Item name={'areaBaselineValue'} label={<Space>面积图基线</Space>}>
                <Slider />
            </Form.Item>
            <Form.Item name={'areaOpacity'} label={<Space>面积图透明度</Space>}>
                <Slider step={0.01} min={0} max={1} />
            </Form.Item>
            <Form.Item name={'areaBlendMode'} label={<Space>面积图混合方式</Space>}>
                <Select
                    placeholder={'选择混合方式'}
                    options={blendModeList.map((mode) => {
                        return {
                            value: mode,
                            label: mode,
                        };
                    })}
                />
            </Form.Item>
        </Form>
    );
}
