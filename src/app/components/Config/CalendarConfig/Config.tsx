import * as React from 'react';
import {Tabs} from 'antd';
import {useAtom} from 'jotai';
import {FcCalendar, FcSettings} from 'react-icons/fc';
import {appAtom} from '../../../atoms/appAtom';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import DateConfig from './DateConfig';
import GeneralConfig from './GeneralConfig';

export default function CalendarConfig() {
    const [{activeKey}] = useAtom(appAtom);

    return (
        <Tabs tabPosition={'left'} type={'card'} className={'h-full w-full'}>
            <StyledTabPane key={'general'} tab={<FcSettings />}>
                <GeneralConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane key={'date'} tab={<FcCalendar />}>
                <DateConfig id={activeKey} />
            </StyledTabPane>
            <StyledTabPane></StyledTabPane>
        </Tabs>
    );
}
