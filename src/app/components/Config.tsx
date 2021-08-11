import * as React from 'react';
import {FcLineChart} from 'react-icons/fc';
import {useDispatch, useSelector} from 'react-redux';
import {
    addKey,
    removeKey,
    setActiveKey,
    setData,
    setLegendAlign,
    setLegendLayout,
    setLegendVerticalAlign,
    setLines,
    setNewData,
    setScale,
    setShowCartesianGrid,
    setShowLegend,
    setShowXAxis,
    setShowYAxis,
    setXAxisLabel,
} from '../features/chart/lineChartSlice';
import {RootState} from '../redux/store';
import {Button, Input, Switch, Select, Collapse, Space, Radio, Checkbox, Table, Slider, Upload, message} from 'antd';
import MarginInput from './MarginInput';
import {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    ArrowUpOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import {generateRandomHexColor} from '../utils/generateRandomHexColor';
import Modal from 'antd/lib/modal/Modal';
import {useState} from 'react';
import EditableDiv from './EditableDiv';
import styled from 'styled-components';
import {curveTypes} from '../types/curveTypes';
import {ColorResult, SketchPicker} from 'react-color';
import {useRef} from 'react';
import {useClickAway} from 'ahooks';
import {RcFile, UploadChangeParam} from 'antd/lib/upload';

const Label = (props: {children: string}) => (
    <span style={{lineHeight: '20px', fontSize: 12, width: '100%'}}>{props.children}</span>
);

const DataTable = () => {
    const {data, lines} = useSelector((state: RootState) => state.chart);
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const showImportModal = () => {
        setIsImportModalVisible(true);
    };

    const hideImportaModal = () => {
        setIsImportModalVisible(false);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isImportModalVisible, setIsImportModalVisible] = useState(false);

    return (
        <>
            <Modal visible={isModalVisible} title={'数据'} onCancel={hideModal} onOk={hideModal}>
                <Table
                    size={'small'}
                    pagination={{pageSize: 5}}
                    dataSource={data}
                    columns={[
                        {key: 'name', dataIndex: 'name', title: 'name'},
                        ...lines.map((item) => {
                            return {
                                key: item.key,
                                dataIndex: item.key,
                                title: item.key,
                                render: (value: number, record) => (
                                    <EditableDiv
                                        value={value}
                                        key={value}
                                        onFinishEditing={(value: number) => {
                                            dispatch(
                                                setData({index: data.indexOf(record), key: item.key, newValue: value})
                                            );
                                        }}
                                    />
                                ),
                            };
                        }),
                    ]}
                    footer={() => (
                        <Button
                            icon={<PlusOutlined />}
                            onClick={() => {
                                dispatch(setNewData([...data, data[0]]));
                            }}
                        >
                            新增
                        </Button>
                    )}
                ></Table>
            </Modal>
            <Modal
                onCancel={hideImportaModal}
                onOk={hideImportaModal}
                title={'导入数据'}
                visible={isImportModalVisible}
            >
                <Upload.Dragger
                    beforeUpload={(file: RcFile) => {
                        if (file.type !== 'application/json') {
                            message.error('只能上传 .json 文件');
                        }
                    }}
                    name={'file'}
                    onChange={({file}: UploadChangeParam) => {
                        console.log(file);
                    }}
                ></Upload.Dragger>
            </Modal>
            <Button onClick={showModal} block type={'primary'}>
                编辑数据
            </Button>
            <Button onClick={showImportModal} block>
                导入数据
            </Button>
        </>
    );
};

const CollapsePanel = styled(Collapse.Panel)`
    & .ant-collapse-header {
        padding-left: 0 !important;
    }
`;

export default function Config() {
    const {
        showXAxis,
        showYAxis,
        data,
        showLegend,
        legendLayout,
        legendAlign,
        legendVerticalAlign,
        lines,
        showCartesianGrid,
        activeKey,
        scale,
    } = useSelector((state: RootState) => state.chart);
    const chartConfig = useSelector((state: RootState) => state.chart);
    const {selectionId} = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const ref = useRef(null);

    useClickAway(() => {
        setDisplayColorPicker(false);
    }, ref);

    function renderChart() {
        window.parent.postMessage(
            {
                pluginMessage: {
                    type: 'render-chart',
                    svg: document.querySelector('.recharts-surface').outerHTML,
                    config: chartConfig,
                },
            },
            '*'
        );
    }

    React.useEffect(() => {
        if (selectionId.length > 0) {
            window.parent.postMessage(
                {
                    pluginMessage: {
                        type: 'update-chart',
                        svg: document.querySelector('.recharts-surface').outerHTML,
                        config: chartConfig,
                    },
                },
                '*'
            );
        }
    }, [chartConfig, selectionId]);

    const config = (
        <>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 8}}>
                <FcLineChart style={{marginRight: 8}} />
                <div style={{fontSize: 16, lineHeight: '24px', fontWeight: 'bold'}}>Line Chart</div>
            </div>
            <Collapse ghost accordion style={{background: 'white', padding: 0}}>
                <CollapsePanel key={'general'} header={'General'}>
                    <Slider
                        min={0.3}
                        max={3}
                        step={0.01}
                        value={scale}
                        onChange={(value: number) => dispatch(setScale(value))}
                    />
                    <MarginInput />
                </CollapsePanel>
                <CollapsePanel key={'axes'} header={'Axes'}>
                    <Space direction={'vertical'}>
                        <Space>
                            <Label>X Axis</Label>
                            <Switch
                                size={'small'}
                                checked={showXAxis}
                                onChange={(checked) => dispatch(setShowXAxis(checked))}
                            ></Switch>
                        </Space>
                        {showXAxis ? (
                            <Space direction={'vertical'} size={2}>
                                <Label>Title</Label>
                                <Input
                                    onChange={(e) => {
                                        dispatch(setXAxisLabel(e.target.value));
                                    }}
                                ></Input>
                            </Space>
                        ) : null}
                        <Space>
                            <Label>Y Axis</Label>
                            <Switch
                                size={'small'}
                                checked={showYAxis}
                                onChange={(checked) => dispatch(setShowYAxis(checked))}
                            ></Switch>
                        </Space>
                    </Space>
                </CollapsePanel>
                <CollapsePanel key={'grid'} header={'Grid'}>
                    <Space>
                        <Label>Grid</Label>
                        <Switch
                            size={'small'}
                            checked={showCartesianGrid}
                            onChange={(checked) => dispatch(setShowCartesianGrid(checked))}
                        ></Switch>
                    </Space>
                </CollapsePanel>
                <CollapsePanel key={'legend'} header={'Legend'}>
                    <Space direction="vertical">
                        <Space>
                            <Label>Legend</Label>
                            <Switch
                                size={'small'}
                                checked={showLegend}
                                onChange={(checked) => dispatch(setShowLegend(checked))}
                            ></Switch>
                        </Space>
                        <Radio.Group
                            size={'small'}
                            value={legendLayout}
                            onChange={(e) => {
                                dispatch(setLegendLayout(e.target.value));
                            }}
                        >
                            <Radio.Button value={'vertical'}>
                                <ArrowUpOutlined />
                            </Radio.Button>
                            <Radio.Button value={'horizontal'}>
                                <ArrowRightOutlined />
                            </Radio.Button>
                        </Radio.Group>
                        <Radio.Group
                            size={'small'}
                            value={legendAlign}
                            onChange={(e) => {
                                dispatch(setLegendAlign(e.target.value));
                            }}
                        >
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
                        <Radio.Group
                            size={'small'}
                            value={legendVerticalAlign}
                            onChange={(e) => {
                                dispatch(setLegendVerticalAlign(e.target.value));
                            }}
                        >
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
                    </Space>
                </CollapsePanel>
                <CollapsePanel header={'Data'} key={'data'}>
                    <Space direction={'vertical'}>
                        {Object.keys(data[0]).map((key) =>
                            key === 'name' ? null : (
                                <Checkbox
                                    value={key}
                                    checked={lines.find((item) => item.key === key) ? true : false}
                                    key={key}
                                    onChange={(e) => {
                                        e.target.checked
                                            ? dispatch(
                                                  addKey({
                                                      key,
                                                      color: generateRandomHexColor(),
                                                      curveType: 'monotone',
                                                  })
                                              )
                                            : dispatch(removeKey(key));
                                    }}
                                >
                                    {key}
                                </Checkbox>
                            )
                        )}
                        <DataTable />
                    </Space>
                </CollapsePanel>
                <CollapsePanel key={'lines'} header={'Lines'}></CollapsePanel>
            </Collapse>
            <Space></Space>
            <Button style={{width: '100%'}} type={'primary'} onClick={renderChart}>
                渲染
            </Button>
        </>
    );

    const lineConfig = (
        <>
            <Space style={{fontSize: 16, lineHeight: '24px', fontWeight: 'bold'}}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    type={'text'}
                    size={'small'}
                    onClick={() => {
                        dispatch(setActiveKey(''));
                    }}
                ></Button>
                Line
            </Space>
            <Collapse ghost accordion style={{background: 'white', padding: 0}}>
                <CollapsePanel header={'Basic'} key={'basic'}>
                    <Label>Key</Label>
                    <Input disabled value={activeKey} />
                    <Label>线条类型</Label>
                    <Select
                        style={{width: '100%'}}
                        value={lines.find((line) => line.key === activeKey)?.curveType as string}
                        onChange={(value: string) => {
                            dispatch(
                                setLines({
                                    key: activeKey,
                                    line: {
                                        curveType: value,
                                    },
                                })
                            );
                        }}
                    >
                        {curveTypes.map((type) => (
                            <Select.Option value={type} key={type}>
                                {type}
                            </Select.Option>
                        ))}
                    </Select>
                    <div ref={ref}>
                        <Label>Color</Label>
                        <Button onClick={() => setDisplayColorPicker(true)} block>
                            <div
                                style={{
                                    width: '100%',
                                    height: 16,
                                    borderRadius: 2,
                                    background: lines.find((line) => line.key === activeKey)?.color,
                                }}
                            ></div>
                        </Button>
                        {displayColorPicker ? (
                            <SketchPicker
                                color={lines.find((line) => line.key === activeKey)?.color}
                                onChange={(color: ColorResult) => {
                                    console.log(color.hex);
                                    dispatch(
                                        setLines({
                                            key: activeKey,
                                            line: {
                                                color: color.hex,
                                            },
                                        })
                                    );
                                }}
                            />
                        ) : null}
                    </div>
                </CollapsePanel>
            </Collapse>
        </>
    );

    return (
        <div
            className={'Config'}
            style={{
                width: 260,
                height: '100%',
                padding: 16,
            }}
        >
            {activeKey.length ? lineConfig : config}
        </div>
    );
}
