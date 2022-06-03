//@ts-nocheck
import * as React from 'react';
import {Tabs} from 'antd';
import GridConfig from './GridConfig';
import AxisConfig from './AxisConfig';
import LegendConfig from '../General/LegendConfig';
import GeneralConfig from './GeneralConfig';
import LinesConfig from './LinesConfig';
import PointsConfig from './PointsConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcAbout, FcGrid, FcLineChart, FcOrgUnit, FcRuler, FcSettings, FcViewDetails} from 'react-icons/fc';
import {useAtom} from 'jotai';
import {appAtom} from '../../../atoms/appAtom';

export default function LineConfig() {
    // const {activeSerie} = useSelector((state: RootState) => state.line);
    const [{activeKey}] = useAtom(appAtom);

    const config = (
        <>
            <Tabs tabPosition={'left'} type={'card'} className={'w-full h-full'}>
                <StyledTabPane key={'general'} tab={<FcSettings />}>
                    <GeneralConfig id={activeKey} />
                </StyledTabPane>
                <StyledTabPane key={'axes'} tab={<FcRuler />}>
                    <AxisConfig id={activeKey} />
                </StyledTabPane>
                <StyledTabPane key={'grid'} tab={<FcGrid />}>
                    <GridConfig id={activeKey} />
                </StyledTabPane>
                <StyledTabPane key={'legend'} tab={<FcAbout />}>
                    <LegendConfig id={activeKey} />
                </StyledTabPane>
                <StyledTabPane key={'lines'} tab={<FcLineChart />}>
                    <LinesConfig id={activeKey} />
                </StyledTabPane>
                <StyledTabPane key={'points'} tab={<FcOrgUnit />}>
                    <PointsConfig id={activeKey} />
                </StyledTabPane>
            </Tabs>
        </>
    );

    return config;
}
