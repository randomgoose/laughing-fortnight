import * as React from 'react';
import ConfigPage from '../ConfigPage';
import {FcSettings} from 'react-icons/fc';
import {Form, Select, Slider, Space} from 'antd';
import MarginInput from '../../CustomInput/MarginInput';
import {useTranslation} from 'react-i18next';
import {useScatter} from '../../../hooks/useScatter';
import {Param} from '../../../atoms/appAtom';
import ColorSchemeSelector from '../../color-scheme-selector';

const blendModeList = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
];

export default function GeneralConfig({id}: Param) {
    const {scatter, setPartialState} = useScatter(id);
    const {margin, colors, nodeSize, blendMode, colorSchemeId} = scatter;
    const {t} = useTranslation();

    return (
        <ConfigPage title={t('General')} icon={<FcSettings />}>
            <Form
                layout={'vertical'}
                initialValues={{
                    margin,
                    colors,
                    nodeSize,
                    blendMode,
                    colorSchemeId,
                }}
                onValuesChange={(changedValues) => {
                    setPartialState(changedValues);
                }}
            >
                <Form.Item name="nodeSize" label={t('Node size')}>
                    <Slider />
                </Form.Item>
                <Form.Item name="margin" label={t('Margin')}>
                    <MarginInput />
                </Form.Item>
                <ColorSchemeSelector />
                <Form.Item name={'blendMode'} label={<Space>{t('Blend Mode')}</Space>}>
                    <Select
                        placeholder={'Blend mode'}
                        options={blendModeList.map((mode) => {
                            return {
                                value: mode,
                                label: mode,
                            };
                        })}
                    />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
