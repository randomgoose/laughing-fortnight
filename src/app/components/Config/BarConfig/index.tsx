import * as React from 'react';
import {Tabs} from 'antd';
import GeneralConfig from './GeneralConfig';
import {StyledTabPane} from '../../StyledComponents/StyledComponents';
import {FcAbout, FcGrid, FcNumericalSorting12, FcRuler, FcSettings} from 'react-icons/fc';
import AxisConfig from '../General/AxisConfig';
import GridConfig from '../General/GridConfig';
import LegendConfig from '../General/LegendConfig';
import {PrimitiveAtom, useAtom} from 'jotai';
import LabelConfig from './LabelConfig';
import {BarState} from '../../../atoms/barAtomFamily';
import ConfigForm from '../config-form';

export default function BarConfig({atom}: {atom: PrimitiveAtom<BarState>}) {
    const [bar, setBar] = useAtom(atom);

    const config = (
        <ConfigForm<BarState> state={bar} set={setBar}>
            <Tabs tabPosition={'left'} type={'card'} className={'w-full h-full'}>
                <StyledTabPane key={'general'} tab={<FcSettings />}>
                    <GeneralConfig />
                </StyledTabPane>
                <StyledTabPane key={'axis'} tab={<FcRuler />}>
                    <AxisConfig<BarState> state={bar} set={setBar} />
                </StyledTabPane>
                <StyledTabPane key={'grid'} tab={<FcGrid />}>
                    <GridConfig />
                </StyledTabPane>
                <StyledTabPane key={'legend'} tab={<FcAbout />}>
                    <LegendConfig />
                </StyledTabPane>
                <StyledTabPane key={'label'} tab={<FcNumericalSorting12 />}>
                    <LabelConfig />
                </StyledTabPane>
            </Tabs>
        </ConfigForm>
    );

    return config;
}
