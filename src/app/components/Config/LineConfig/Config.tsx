import * as React from 'react';
import {FcLineChart} from 'react-icons/fc';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Button, Collapse, Space} from 'antd';
import GridConfig from './GridConfig';
import AxisConfig from './AxisConfig';
import LegendConfig from './LegendConfig';
import DataConfig from './DataConfig';
import SerieConfig from './SerieConfig';
import CollapsePanel from '../../StyledComponents/StyledCollapsePanel';
import GeneralConfig from '../GeneralConfig';
import LinesConfig from './LinesConfig';
import PointsConfig from './PointsConfig';

export default function Config() {
    const {activeSerie} = useSelector((state: RootState) => state.line);
    const chartConfig = useSelector((state: RootState) => state.line);
    const {selectionId} = useSelector((state: RootState) => state.app);

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
                    <GeneralConfig />
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
                <CollapsePanel header={'数据'} key={'data'}>
                    <DataConfig />
                </CollapsePanel>
                <CollapsePanel key={'lines'} header={'Lines'}>
                    <LinesConfig />
                </CollapsePanel>
                <CollapsePanel key={'points'} header={'数据点'}>
                    <PointsConfig />
                </CollapsePanel>
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
            {activeSerie ? <SerieConfig /> : config}
        </div>
    );
}
