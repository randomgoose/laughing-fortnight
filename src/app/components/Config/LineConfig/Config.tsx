import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Button, Tabs, Space} from 'antd';
import GridConfig from './GridConfig';
import AxisConfig from './AxisConfig';
import LegendConfig from './LegendConfig';
import DataConfig from './DataConfig';
import SerieConfig from './SerieConfig';
import GeneralConfig from './GeneralConfig';
import LinesConfig from './LinesConfig';
import PointsConfig from './PointsConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';

export default function LineConfig() {
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
            <Tabs tabPosition={'left'} type={'card'} style={{height: '100%'}}>
                <StyledTabPane key={'general'} tab={'General'}>
                    <GeneralConfig />
                </StyledTabPane>
                <StyledTabPane key={'axes'} tab={'坐标轴'}>
                    <AxisConfig />
                </StyledTabPane>
                <StyledTabPane key={'grid'} tab={'网格'}>
                    <GridConfig />
                </StyledTabPane>
                <StyledTabPane key={'legend'} tab={'图例'}>
                    <LegendConfig />
                </StyledTabPane>
                <StyledTabPane tab={'数据'} key={'data'}>
                    <DataConfig />
                </StyledTabPane>
                <StyledTabPane key={'lines'} tab={'Lines'}>
                    <LinesConfig />
                </StyledTabPane>
                <StyledTabPane key={'points'} tab={'数据点'}>
                    <PointsConfig />
                </StyledTabPane>
            </Tabs>
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
                height: '100%',
                width: '100%',
            }}
        >
            {activeSerie ? <SerieConfig /> : config}
        </div>
    );
}
