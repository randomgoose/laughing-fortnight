import * as React from 'react';
import {Space, Slider, Select, Form, Switch, Typography} from 'antd';
import MarginInput from '../../CustomInput/MarginInput';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ChartState, setPartialState} from '../../../features/chart/lineChartSlice';
import {colorSchemes} from '@nivo/colors';
import {AreaChartOutlined, ColumnWidthOutlined, HighlightOutlined} from '@ant-design/icons';
import {FcSettings} from 'react-icons/fc';
import _ from 'lodash';

const colorSchemeList = Object.keys(colorSchemes);

const scaleTypes = ['linear', 'point'];

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
    const {scale, colors, enableArea, margin, areaBaselineValue, areaOpacity, areaBlendMode, data} = useSelector(
        (state: RootState) => state.line
    );

    const [form] = Form.useForm();

    React.useEffect(() => {
        form.setFieldsValue({scale, enableArea, margin, areaBaselineValue, areaOpacity, areaBlendMode});
    }, [scale, enableArea, margin, areaBaselineValue, areaOpacity, areaBlendMode]);

    React.useEffect(() => {
        console.log(enableArea);
    }, [enableArea]);

    return (
        <>
            <Typography.Title level={5}>
                <Space align={'center'} size={4}>
                    <FcSettings />
                    通用设置
                </Space>
            </Typography.Title>
            <Form
                form={form}
                layout={'vertical'}
                onValuesChange={(changedValues: Partial<ChartState>) => {
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
                <Form.Item name={'xScale'} label={'xScale'}>
                    <Select
                        options={scaleTypes.map((type) => ({
                            title: type,
                            value: type,
                        }))}
                    ></Select>
                </Form.Item>
                <Form.Item name={'yScale'} label={'yScale'}>
                    <Select
                        options={scaleTypes.map((type) => ({
                            title: type,
                            value: type,
                        }))}
                    ></Select>
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
                    <Slider
                        min={0}
                        max={
                            _.maxBy(
                                data.map((datum) => _.maxBy(datum.data, (d) => d.y)),
                                (d) => d.y
                            ).y
                        }
                    />
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
        </>
    );
}
