import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Tabs} from 'antd';
import GridConfig from './GridConfig';
import AxisConfig from './AxisConfig';
import LegendConfig from '../General/LegendConfig';
import SerieConfig from './SerieConfig';
import GeneralConfig from './GeneralConfig';
import LinesConfig from './LinesConfig';
import PointsConfig from './PointsConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcAbout, FcGrid, FcLineChart, FcOrgUnit, FcRuler, FcSettings, FcViewDetails} from 'react-icons/fc';
import {useAtom} from 'jotai';
import {appAtom} from '../../../atoms/appAtom';

export default function LineConfig() {
    const {activeSerie} = useSelector((state: RootState) => state.line);
    const [app] = useAtom(appAtom);
    const {id} = app.charts.find((chart) => chart.id === app.activeKey);

    const config = (
        <>
            <Tabs tabPosition={'left'} type={'card'} className={'w-full h-full'}>
                <StyledTabPane key={'general'} tab={<FcSettings />}>
                    <GeneralConfig />
                </StyledTabPane>
                <StyledTabPane key={'axes'} tab={<FcRuler />}>
                    <AxisConfig id={id} />
                </StyledTabPane>
                <StyledTabPane key={'grid'} tab={<FcGrid />}>
                    <GridConfig id={id} />
                </StyledTabPane>
                <StyledTabPane key={'legend'} tab={<FcAbout />}>
                    <LegendConfig id={id} />
                </StyledTabPane>
                <StyledTabPane key={'lines'} tab={<FcLineChart />}>
                    <LinesConfig id={id} />
                </StyledTabPane>
                <StyledTabPane key={'points'} tab={<FcOrgUnit />}>
                    <PointsConfig />
                </StyledTabPane>
                <StyledTabPane key={'code'} tab={<FcViewDetails />}></StyledTabPane>
            </Tabs>
        </>
    );

    return activeSerie ? <SerieConfig /> : config;
}
