import React from 'react';
import {useTranslation} from 'react-i18next';
import {FcLandscape} from 'react-icons/fc';
import {Param} from '../../../atoms/appAtom';
import useRadar from '../../../hooks/useRadar';
import ConfigPage from '../ConfigPage';
import {Form, Select, Slider} from 'antd';
import {blendModeList} from '../../../atoms/types';
import ColorSchemeSelector from '../../color-scheme-selector';

export default function StyleConfig({id}: Param) {
    const {radar, setPartialState} = useRadar(id);
    const {t} = useTranslation();

    return (
        <ConfigPage title={t('Style')} icon={<FcLandscape />}>
            <Form
                layout={'vertical'}
                initialValues={radar}
                onValuesChange={(changedValues) => setPartialState(changedValues)}
            >
                <ColorSchemeSelector />
                <Form.Item label={t('Blend Mode')} name={'blendMode'}>
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
                <Form.Item label={t('Fill Opacity')} name={'fillOpacity'}>
                    <Slider min={0} max={1} step={0.01} />
                </Form.Item>
                <Form.Item label={t('Border Width')} name={'borderWidth'}>
                    <Slider min={0} max={20} />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
