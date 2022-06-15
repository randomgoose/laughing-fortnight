import * as React from 'react';
import {FcGrid, FcLandscape, FcOrgUnit, FcSettings} from 'react-icons/fc';
import {Tabs} from 'antd';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import GeneralConfig from './GeneralConfig';
// import ArcConfig from './ArcConfig'
import {appAtom} from '../../../atoms/appAtom';
import {useAtom} from 'jotai';
import StyleConfig from './StyleConfig';
import GridConfig from './GridConfig';
import DotsConfig from './DotsConfig';

export default function RadarConfig() {
    const [{activeKey}] = useAtom(appAtom);
    const config = (
        <Tabs tabPosition={'left'} type={'card'} className={'h-full w-full'}>
            <StyledTabPane key={'general'} tab={<FcSettings />}>
                <GeneralConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane key={'style'} tab={<FcLandscape />}>
                <StyleConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane key={'grid'} tab={<FcGrid />}>
                <GridConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane key={'dots'} tab={<FcOrgUnit />}>
                <DotsConfig id={activeKey} />
            </StyledTabPane>
        </Tabs>
    );

    return config;
}
