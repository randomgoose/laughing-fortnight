import {useClickAway} from 'ahooks';
import {Button, Form, Radio, Slider, Space, Switch, Typography} from 'antd';
import * as React from 'react';
import {SketchPicker} from 'react-color';
import {FcOrgUnit} from 'react-icons/fc';
import {useDispatch, useSelector} from 'react-redux';
import {setPartialState} from '../../../features/chart/lineChartSlice';
import {RootState} from '../../../redux/store';
import Label from '../../Typography/Label';

const regHex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;

export default function PointsConfig() {
    const dispatch = useDispatch();
    const {pointSize, enablePoints, pointColor} = useSelector((state: RootState) => state.line);
    const [showColorPicker, setShowColorPicker] = React.useState(true);
    const ref = React.useRef<HTMLDivElement>(null);

    useClickAway(() => {
        setShowColorPicker(false);
    }, ref);

    return (
        <>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcOrgUnit />
                    数据点设置
                </Space>
            </Typography.Title>
            <Form
                layout={'vertical'}
                initialValues={{pointSize, enablePoints, pointColor}}
                onValuesChange={(changedValues) => {
                    if (Object.keys(changedValues).includes('pointColor')) {
                        if (regHex.test(changedValues.pointColor)) {
                            dispatch(setPartialState(changedValues));
                        } else {
                            dispatch(setPartialState({pointColor: JSON.parse(changedValues.pointColor)}));
                        }
                    } else dispatch(setPartialState(changedValues));
                }}
            >
                <Form.Item
                    name={'enablePoints'}
                    label={<Label>启用数据点</Label>}
                    fieldKey={'enable-points'}
                    valuePropName={'checked'}
                >
                    <Switch size={'small'}></Switch>
                </Form.Item>
                <Form.Item name={'pointSize'} label={<Label>数据点尺寸</Label>}>
                    <Slider min={1} max={20} />
                </Form.Item>
                <Form.Item name={'pointColor'} label={'数据点颜色'}>
                    <Radio.Group
                        optionType={'button'}
                        options={[
                            {value: JSON.stringify({from: 'color', modifier: []}), label: '默认'},
                            {value: '#000000', label: '自定义'},
                        ]}
                    >
                        <Radio value={JSON.stringify({from: 'color', modifier: []})}>默认</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
            <div ref={ref} style={{position: 'fixed'}}>
                {regHex.test(pointColor) ? (
                    <Button
                        onClick={() => {
                            setShowColorPicker(true);
                        }}
                    >
                        <div style={{background: pointColor, width: 16, height: 12, borderRadius: 2}}></div>
                    </Button>
                ) : null}
                {regHex.test(pointColor) && showColorPicker ? (
                    <>
                        <SketchPicker
                            styles={{
                                default: {
                                    picker: {
                                        position: 'absolute',
                                        top: 32,
                                        right: 0,
                                        zIndex: 999,
                                    },
                                },
                            }}
                            color={pointColor}
                            onChange={(color) => {
                                dispatch(setPartialState({pointColor: color.hex}));
                            }}
                        />
                    </>
                ) : null}
            </div>
        </>
    );
}
