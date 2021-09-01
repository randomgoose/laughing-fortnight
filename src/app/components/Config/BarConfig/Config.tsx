import * as React from 'react';
import {Tabs} from 'antd';
import GeneralConfig from './GeneralConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcSettings} from 'react-icons/fc';

export default function LineConfig() {
    const config = (
        <>
            <Tabs tabPosition={'left'} type={'card'} style={{height: '100%'}}>
                <StyledTabPane key={'general'} tab={<FcSettings />}>
                    <GeneralConfig />
                </StyledTabPane>
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
