import * as React from 'react';
import {Radio, Form, Slider, Collapse, Button, Space, Typography} from 'antd';
import {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import Anchor from '../../CustomInput/Anchor';
import {FcAbout} from 'react-icons/fc';
import {StyledCollapsePanel} from '../../StyledComponents/StyledComponents';
import {baseLegend} from '../../../data/baseLegend';
import {useTranslation} from 'react-i18next';
import {useAtom} from 'jotai';
import {appAtom, Param} from '../../../atoms/appAtom';
import {lineAtomFamily} from '../../../atoms/lineAtomFamily';
import {barAtomFamily} from '../../../atoms/barAtomFamily';
import {pieAtomFamily} from '../../../atoms/pieAtomFamily';
import {useImmerAtom} from 'jotai/immer';
import {scatterAtomFamily} from '../../../atoms/scatterAtomFamily';

export default ({id}: Param) => {
    const [app] = useAtom(appAtom);
    const activeChart = app.charts.find((chart) => chart.id === app.activeKey);

    const {t} = useTranslation();
    const [pie, setPie] = useImmerAtom(pieAtomFamily({id}));
    const [line, setLine] = useImmerAtom(lineAtomFamily({id}));
    const [bar, setBar] = useImmerAtom(barAtomFamily({id}));
    const [scatter, setScatter] = useImmerAtom(scatterAtomFamily({id}));

    const addLegend = React.useCallback(() => {
        switch (activeChart?.type) {
            case 'line':
                setLine((draftState) => {
                    draftState.legends?.push(baseLegend[0]);
                });
                break;
            case 'bar':
                setBar((draftState) => {
                    draftState.legends?.push({...baseLegend[0], dataFrom: 'keys'});
                });
                break;
            case 'pie':
                setPie((draftState) => {
                    draftState.legends?.push(baseLegend[0]);
                });
                break;
            case 'scatter':
                setScatter((draftState) => {
                    draftState.legends?.push(baseLegend[0]);
                });
        }
    }, [line.legends, activeChart?.type, bar.legends, pie.legends, scatter.legends]);

    const getLegends = React.useCallback(() => {
        switch (activeChart?.type) {
            case 'line':
                return line.legends;
            case 'bar':
                return bar.legends;
            case 'pie':
                return pie.legends ? pie.legends : [];
            case 'scatter':
                return scatter.legends;
        }
    }, [line.legends, bar.legends, activeChart?.type, pie.legends, scatter.legends]);

    const deleteLegendByIndex = React.useCallback(
        (index: number) => {
            switch (activeChart?.type) {
                case 'line':
                    setLine((draftState) => {
                        draftState.legends = draftState.legends?.filter((_legene, i) => i !== index);
                    });
                    break;
                case 'bar':
                    setBar((draftState) => {
                        draftState.legends = draftState.legends?.filter((_legene, i) => i !== index);
                    });
                    break;
                case 'pie':
                    setPie((draftState) => {
                        draftState.legends = draftState.legends?.filter((_legene, i) => i !== index);
                    });
                case 'scatter':
                    setScatter((draftState) => {
                        draftState.legends = draftState.legends?.filter((_legene, i) => i !== index);
                    });
                    break;
            }
        },
        [line.legends, activeChart?.type, bar.legends, pie.legends, scatter.legends]
    );

    return (
        <Space className={'w-full'} direction={'vertical'}>
            <Typography.Title level={5}>
                <Space size={4}>
                    <FcAbout />
                    {t('Legend')}
                </Space>
            </Typography.Title>
            <Collapse collapsible={'header'} ghost>
                {getLegends()?.map((legend, index) => {
                    return (
                        <StyledCollapsePanel
                            key={index}
                            header={`${t('Legend')} ${index}`}
                            extra={
                                <span
                                    onClick={() => deleteLegendByIndex(index)}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <DeleteOutlined />
                                </span>
                            }
                        >
                            <Form
                                onValuesChange={(changedValues) => {
                                    switch (activeChart?.type) {
                                        case 'line':
                                            setLine((draftState) => {
                                                Object.assign(draftState.legends?.[index], changedValues);
                                            });
                                            break;
                                        case 'bar':
                                            setBar((draftState) => {
                                                Object.assign(draftState.legends?.[index], {
                                                    ...changedValues,
                                                    dataFrom: 'keys',
                                                });
                                            });
                                        case 'pie':
                                            setPie((pie) => {
                                                const legend = {...pie.legends?.[index]};
                                                const newLegend = Object.assign(legend, changedValues);

                                                const temp = pie.legends ? [...pie.legends] : [];
                                                temp.splice(index, 1, newLegend);

                                                console.log(temp);
                                                return {
                                                    ...pie,
                                                    legends: temp,
                                                };
                                            });
                                            break;
                                        case 'scatter':
                                            setScatter((draftState) => {
                                                Object.assign(draftState.legends?.[index], changedValues);
                                            });
                                    }
                                }}
                                initialValues={legend}
                                layout={'vertical'}
                            >
                                <Form.Item name={'direction'} label={t('Direction')}>
                                    <Radio.Group size={'small'}>
                                        <Radio.Button value={'column'}>
                                            <ArrowUpOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'row'}>
                                            <ArrowRightOutlined />
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name={'translateX'} label={t('Translate X')}>
                                    <Slider min={-500} max={500} />
                                </Form.Item>
                                <Form.Item name={'translateY'} label={t('Translate Y')}>
                                    <Slider min={-500} max={500} />
                                </Form.Item>
                                <Form.Item name={'legendAlign'} label={t('Legend Align')}>
                                    <Radio.Group size={'small'}>
                                        <Radio.Button value={'left'}>
                                            <AlignLeftOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'center'}>
                                            <AlignCenterOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'right'}>
                                            <AlignRightOutlined />
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name={'legendVerticalAlign'} label={t('Legend Vertical Align')}>
                                    <Radio.Group size={'small'}>
                                        <Radio.Button value={'top'}>
                                            <AlignLeftOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'middle'}>
                                            <AlignCenterOutlined />
                                        </Radio.Button>
                                        <Radio.Button value={'bottom'}>
                                            <AlignRightOutlined />
                                        </Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item name={'anchor'} label={t('Anchor')}>
                                    <Anchor />
                                </Form.Item>
                            </Form>
                        </StyledCollapsePanel>
                    );
                })}
            </Collapse>
            <Button icon={<PlusOutlined />} onClick={addLegend}>
                {t('New Legend')}
            </Button>
        </Space>
    );
};
