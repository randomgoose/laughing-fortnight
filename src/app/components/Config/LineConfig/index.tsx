import * as React from 'react';
import {Tabs} from 'antd';
import LegendConfig from '../General/LegendConfig';
import GeneralConfig from './GeneralConfig';
import LinesConfig from './LinesConfig';
import PointsConfig from './PointsConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcAbout, FcGrid, FcLineChart, FcOrgUnit, FcRuler, FcSettings} from 'react-icons/fc';
import {PrimitiveAtom, useAtom} from 'jotai';
import ConfigForm from '../config-form';
import {LineState} from '../../../atoms/lineAtomFamily';
import _ from 'lodash';
import AxisConfig from '../General/AxisConfig';
import GridConfig from '../General/GridConfig';

export default function LineConfig({atom}: {atom: PrimitiveAtom<LineState>}) {
    const [line, setLine] = useAtom(atom);

    const max = line.data.map((datum) => _.maxBy(datum.data, (d) => d.y));
    const max_ = _.maxBy(max, (d) => {
        if (d) return d.y;
    });

    const config = (
        <ConfigForm<LineState> state={line} set={setLine}>
            <Tabs tabPosition={'left'} type={'card'} className={'w-full h-full'}>
                <StyledTabPane key={'general'} tab={<FcSettings />}>
                    <GeneralConfig max={max_ as unknown as number} />
                </StyledTabPane>
                <StyledTabPane key={'axes'} tab={<FcRuler />}>
                    <AxisConfig<LineState> state={line} set={setLine} />
                </StyledTabPane>
                <StyledTabPane key={'grid'} tab={<FcGrid />}>
                    <GridConfig />
                </StyledTabPane>
                <StyledTabPane key={'legend'} tab={<FcAbout />}>
                    <LegendConfig />
                </StyledTabPane>
                <StyledTabPane key={'lines'} tab={<FcLineChart />}>
                    <LinesConfig />
                </StyledTabPane>
                <StyledTabPane key={'points'} tab={<FcOrgUnit />}>
                    <PointsConfig />
                </StyledTabPane>
            </Tabs>
        </ConfigForm>
    );

    return config;
}
