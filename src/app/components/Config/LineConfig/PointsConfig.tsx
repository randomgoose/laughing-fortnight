import {useClickAway} from 'ahooks';
import {Button, Form, Radio, Slider, Space, Switch, Typography} from 'antd';
import * as React from 'react';
import {SketchPicker} from 'react-color';
import {useTranslation} from 'react-i18next';
import {FcOrgUnit} from 'react-icons/fc';
import {Param} from '../../../atoms/appAtom';
import {useLine} from '../../../hooks/useLine';
import Label from '../../Typography/Label';

const regHex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;

export default function PointsConfig({id}: Param) {
    const {line, setPartialState} = useLine(id);
    const {pointSize, enablePoints, pointColor} = line;

    const [showColorPicker, setShowColorPicker] = React.useState(true);
    const ref = React.useRef<HTMLDivElement>(null);

    const {t} = useTranslation();

    useClickAway(() => {
        setShowColorPicker(false);
    }, ref);

    return (
        <>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcOrgUnit />
                    {t('Points')}
                </Space>
            </Typography.Title>
            <Form
                layout={'vertical'}
                initialValues={{pointSize, enablePoints, pointColor}}
                onValuesChange={(changedValues) => {
                    if (Object.keys(changedValues).includes('pointColor')) {
                        if (regHex.test(changedValues.pointColor)) {
                            setPartialState(changedValues);
                        } else {
                            setPartialState({pointColor: JSON.parse(changedValues.pointColor)});
                        }
                    } else setPartialState(changedValues);
                }}
            >
                <Form.Item
                    name={'enablePoints'}
                    label={<Label>{t('Enable points')}</Label>}
                    fieldKey={'enable-points'}
                    valuePropName={'checked'}
                >
                    <Switch size={'small'}></Switch>
                </Form.Item>
                <Form.Item name={'pointSize'} label={<Label>{t('Point size')}</Label>}>
                    <Slider min={1} max={20} />
                </Form.Item>
                <Form.Item name={'pointColor'} label={t('Point Color')}>
                    <Radio.Group
                        optionType={'button'}
                        options={[
                            {value: JSON.stringify({from: 'color', modifier: []}), label: t('Default')},
                            {value: '#000000', label: t('Custom')},
                        ]}
                    />
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
                                setPartialState({pointColor: color.hex});
                            }}
                        />
                    </>
                ) : null}
            </div>
        </>
    );
}
