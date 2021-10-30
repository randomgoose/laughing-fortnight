import * as React from 'react';
import {FcAbout, FcPieChart, FcSettings} from 'react-icons/fc';
import {Tabs} from 'antd';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import GeneralConfig from './GeneralConfig';
import ArcConfig from './ArcConfig';
import LegendConfig from '../General/LegendConfig';

export default function PieConfig() {
    const config = (
        <Tabs tabPosition={'left'} type={'card'} className={'h-full w-full'}>
            <StyledTabPane key={'general'} tab={<FcSettings />}>
                <GeneralConfig />
            </StyledTabPane>
            <StyledTabPane key={'arc'} tab={<FcPieChart />}>
                <ArcConfig />
            </StyledTabPane>
            <StyledTabPane key={'legend'} tab={<FcAbout />}>
                <LegendConfig id={'a'} />
            </StyledTabPane>
        </Tabs>
    );

    return config;
}
