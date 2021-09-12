import * as React from 'react';
import {Tabs} from 'antd';
import GeneralConfig from './GeneralConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcAbout, FcGrid, FcRuler, FcSettings} from 'react-icons/fc';
import AxisConfig from './AxisConfig';
import GridConfig from './GridConfig';
import LegendConfig from '../General/LegendConfig';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import BarConfig from './BarConfig';

export default function Config() {
    const {activeIndex} = useSelector((state: RootState) => state.bar);
    const config = (
        <Tabs tabPosition={'left'} type={'card'} style={{height: '100%'}}>
            <StyledTabPane key={'general'} tab={<FcSettings />}>
                <GeneralConfig />
            </StyledTabPane>
            <StyledTabPane key={'axis'} tab={<FcRuler />}>
                <AxisConfig />
            </StyledTabPane>
            <StyledTabPane key={'grid'} tab={<FcGrid />}>
                <GridConfig />
            </StyledTabPane>
            <StyledTabPane key={'legend'} tab={<FcAbout />}>
                <LegendConfig />
            </StyledTabPane>
        </Tabs>
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
            {activeIndex >= 0 ? <BarConfig /> : config}
        </div>
    );
}
