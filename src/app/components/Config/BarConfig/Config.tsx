import * as React from 'react';
import {Tabs} from 'antd';
import GeneralConfig from './GeneralConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcAbout, FcGrid, FcNumericalSorting12, FcRuler, FcSettings} from 'react-icons/fc';
import AxisConfig from './AxisConfig';
import GridConfig from './GridConfig';
import LegendConfig from '../General/LegendConfig';
import {useAtom} from 'jotai';
import {appAtom} from '../../../atoms/appAtom';
import LabelConfig from './LabelConfig';

export default function Config() {
    // const {activeIndex} = useSelector((state: RootState) => state.bar);
    const [{activeKey}] = useAtom(appAtom);
    const config = (
        <Tabs tabPosition={'left'} type={'card'} className={'w-full h-full'}>
            <StyledTabPane key={'general'} tab={<FcSettings />}>
                <GeneralConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane key={'axis'} tab={<FcRuler />}>
                <AxisConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane key={'grid'} tab={<FcGrid />}>
                <GridConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane key={'legend'} tab={<FcAbout />}>
                <LegendConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane key={'label'} tab={<FcNumericalSorting12 />}>
                <LabelConfig id={activeKey} />
            </StyledTabPane>
        </Tabs>
    );

    return config;
}
