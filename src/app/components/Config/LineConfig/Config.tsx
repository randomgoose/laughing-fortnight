import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Button, Tabs} from 'antd';
import GridConfig from './GridConfig';
import AxisConfig from './AxisConfig';
import LegendConfig from './LegendConfig';
import DataConfig from './DataConfig';
import SerieConfig from './SerieConfig';
import GeneralConfig from './GeneralConfig';
import LinesConfig from './LinesConfig';
import PointsConfig from './PointsConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcAbout, FcDatabase, FcGrid, FcLineChart, FcOrgUnit, FcRuler, FcSettings} from 'react-icons/fc';

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
                    svg: `<svg>${document.querySelector('.canvas').querySelector('svg').innerHTML}</svg>`.replace(
                        /transparent/g,
                        '#ffffff'
                    ),
                    config: chartConfig,
                },
            },
            '*'
        );
    }

    const config = (
        <>
            <Tabs tabPosition={'left'} type={'card'} style={{height: '100%'}}>
                <StyledTabPane key={'general'} tab={<FcSettings />}>
                    <GeneralConfig />
                </StyledTabPane>
                <StyledTabPane key={'axes'} tab={<FcRuler />}>
                    <AxisConfig />
                </StyledTabPane>
                <StyledTabPane key={'grid'} tab={<FcGrid />}>
                    <GridConfig />
                </StyledTabPane>
                <StyledTabPane key={'legend'} tab={<FcAbout />}>
                    <LegendConfig />
                </StyledTabPane>
                <StyledTabPane key={'data'} tab={<FcDatabase />}>
                    <DataConfig />
                </StyledTabPane>
                <StyledTabPane key={'lines'} tab={<FcLineChart />}>
                    <LinesConfig />
                </StyledTabPane>
                <StyledTabPane key={'points'} tab={<FcOrgUnit />}>
                    <PointsConfig />
                </StyledTabPane>
            </Tabs>
            <Button
                style={{
                    position: 'fixed',
                    bottom: '48px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    boxShadow: '0 10px 10px rgba(0, 0, 0, .1)',
                    fontSize: 16,
                    lineHeight: 24,
                }}
                type={'primary'}
                size={'large'}
                onClick={renderChart}
                shape={'round'}
                disabled={!(selectionId.length > 0)}
            >
                {selectionId.length > 0 ? '渲染图表' : '未选择 Frame'}
            </Button>
        </>
    );

    return (
        <div
            className={'Config'}
            style={{
                height: '100%',
                width: 200,
                flexShrink: 0,
            }}
        >
            {activeSerie ? <SerieConfig /> : config}
        </div>
    );
}
