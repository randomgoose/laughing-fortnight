import * as React from 'react';
import {Tabs} from 'antd';
import LegendConfig from '../General/LegendConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcAbout, FcGrid, FcRuler, FcSettings} from 'react-icons/fc';
import {useAtom} from 'jotai';
import {appAtom} from '../../../atoms/appAtom';
import GeneralConfig from './GeneralConfig';
import AxisConfig from './AxisConfig';
import GridConfig from './GridConfig';

export default function ScatterConfig() {
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
                    <LegendConfig />
                </StyledTabPane>
            </Tabs>
        </>
    );

    return config;
}
