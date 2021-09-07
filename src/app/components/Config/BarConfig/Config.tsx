import * as React from 'react';
import {Tabs} from 'antd';
import GeneralConfig from './GeneralConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcGrid, FcRuler, FcSettings} from 'react-icons/fc';
import AxisConfig from './AxisConfig';
import GridConfig from './GridConfig';

export default function LineConfig() {
    const config = (
        <>
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
                <StyledTabPane key={'legend'}></StyledTabPane>
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
            {config}
        </div>
    );
}
