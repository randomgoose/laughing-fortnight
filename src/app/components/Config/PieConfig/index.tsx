import * as React from 'react';
import {FcAbout, FcPieChart, FcSettings} from 'react-icons/fc';
import {Tabs} from 'antd';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import GeneralConfig from './GeneralConfig';
import ArcConfig from './ArcConfig';
import LegendConfig from '../General/LegendConfig';
import {PrimitiveAtom, useAtom} from 'jotai';
import ConfigForm from '../config-form';
import {PieState} from '../../../atoms/pieAtomFamily';

export default function PieConfig({atom}: {atom: PrimitiveAtom<PieState>}) {
    const [pie, setPie] = useAtom(atom);

    const config = (
        <ConfigForm<PieState> state={pie} set={setPie}>
            <Tabs tabPosition={'left'} type={'card'} className={'h-full w-full'}>
                <StyledTabPane key={'general'} tab={<FcSettings />}>
                    <GeneralConfig />
                </StyledTabPane>
                <StyledTabPane key={'arc'} tab={<FcPieChart />}>
                    <ArcConfig />
                </StyledTabPane>
                <StyledTabPane key={'legend'} tab={<FcAbout />}>
                    <LegendConfig />
                </StyledTabPane>
            </Tabs>
        </ConfigForm>
    );

    return config;
}
