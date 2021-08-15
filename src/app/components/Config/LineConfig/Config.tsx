import * as React from 'react';
import {FcLineChart} from 'react-icons/fc';
import {useDispatch, useSelector} from 'react-redux';
import {setScale} from '../../../features/chart/lineChartSlice';
import {RootState} from '../../../redux/store';
import {Button, Collapse, Space, Slider} from 'antd';
import MarginInput from '../../MarginInput';
import GridConfig from './GridConfig';
import Label from '../../Typography/Label';
import AxisConfig from './AxisConfig';
import LegendConfig from './LegendConfig';
import DataConfig from './DataConfig';
import LineConfig from './LineConfig';
import CollapsePanel from '../../StyledComponents/StyledCollapsePanel';

export default function Config() {
    const {activeSerie, scale} = useSelector((state: RootState) => state.line);
    const chartConfig = useSelector((state: RootState) => state.line);
    const {selectionId} = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log(activeSerie);
    }, [activeSerie]);

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
                <div style={{fontSize: 16, lineHeight: '24px', fontWeight: 'bold'}}>折线图</div>
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
                    <Label>边距</Label>
                    <MarginInput />
                </CollapsePanel>
                <CollapsePanel key={'axes'} header={'坐标轴'}>
                    <AxisConfig />
                </CollapsePanel>
                <CollapsePanel key={'grid'} header={'网格'}>
                    <GridConfig />
                </CollapsePanel>
                <CollapsePanel key={'legend'} header={'图例'}>
                    <LegendConfig />
                </CollapsePanel>
                <CollapsePanel header={'Data'} key={'数据'}>
                    <DataConfig />
                </CollapsePanel>
                <CollapsePanel key={'lines'} header={'Lines'}></CollapsePanel>
            </Collapse>
            <Space></Space>
            <Button style={{width: '100%'}} type={'primary'} onClick={renderChart}>
                渲染
            </Button>
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
            {activeSerie !== null ? <LineConfig /> : config}
        </div>
    );
}
