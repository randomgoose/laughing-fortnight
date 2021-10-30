import * as React from 'react';
import {FcAbout, FcPieChart, FcSettings} from 'react-icons/fc';
import {Tabs} from 'antd';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import GeneralConfig from './GeneralConfig';
import ArcConfig from './ArcConfig';
import LegendConfig from '../General/LegendConfig';
import {appAtom} from '../../../atoms/appAtom';
import {useAtom} from 'jotai';

export default function PieConfig() {
    const [{activeKey}] = useAtom(appAtom);
    const config = (
        <Tabs tabPosition={'left'} type={'card'} className={'h-full w-full'}>
            <StyledTabPane key={'general'} tab={<FcSettings />}>
                <GeneralConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane key={'arc'} tab={<FcPieChart />}>
                <ArcConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane key={'legend'} tab={<FcAbout />}>
                <LegendConfig id={activeKey} />
            </StyledTabPane>
        </Tabs>
    );

    return config;
}
