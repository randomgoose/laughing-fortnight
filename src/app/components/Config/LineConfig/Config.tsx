import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {Tabs} from 'antd';
import GridConfig from './GridConfig';
import AxisConfig from './AxisConfig';
import LegendConfig from '../General/LegendConfig';
import DataConfig from './DataConfig';
import SerieConfig from './SerieConfig';
import GeneralConfig from './GeneralConfig';
import LinesConfig from './LinesConfig';
import PointsConfig from './PointsConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcAbout, FcDatabase, FcGrid, FcLineChart, FcOrgUnit, FcRuler, FcSettings, FcViewDetails} from 'react-icons/fc';

export default function LineConfig() {
    const {activeSerie} = useSelector((state: RootState) => state.line);

    React.useEffect(() => {
        console.log(activeSerie);
    }, [activeSerie]);

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
                <StyledTabPane key={'code'} tab={<FcViewDetails />}></StyledTabPane>
            </Tabs>
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
