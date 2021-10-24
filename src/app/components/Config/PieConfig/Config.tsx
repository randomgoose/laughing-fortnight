import * as React from 'react';
import {FcSettings} from 'react-icons/fc';
import {Tabs} from 'antd';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import GeneralConfig from './GeneralConfig';

export default function PieConfig() {
    const config = (
        <Tabs tabPosition={'left'} type={'card'} className={'h-full'}>
            <StyledTabPane key={'general'} tab={<FcSettings />}>
                <GeneralConfig />
            </StyledTabPane>
            {/* <StyledTabPane key={'axes'} tab={'Axis'}></StyledTabPane>
                <StyledTabPane key={'grid'} tab={'Grid'}></StyledTabPane>
                <StyledTabPane key={'legend'} tab={'Legend'}></StyledTabPane>
                <StyledTabPane key={'data'} tab={'Data'}></StyledTabPane>
                <StyledTabPane key={'lines'} tab={'Lines'}></StyledTabPane>
                <StyledTabPane key={'points'} tab={'Points'}></StyledTabPane> */}
        </Tabs>
    );

    return <div className={'Config h-full w-48 flex-shrink-0'}>{config}</div>;
}
