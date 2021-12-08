import React from 'react';
import {useTranslation} from 'react-i18next';
import {FcSettings} from 'react-icons/fc';
import {Param} from '../../../atoms/appAtom';
import useRadar from '../../../hooks/useRadar';
import ConfigPage from '../ConfigPage';
import {Form, Input, Slider, Select} from 'antd';
import {} from '@nivo/radar';
import MarginInput from '../../CustomInput/MarginInput';

export default function GeneralConfig({id}: Param) {
    const {radar, setPartialState, setRadar} = useRadar(id);
    const {t} = useTranslation();

    return (
        <ConfigPage title={t('General')} icon={<FcSettings />}>
            <Form
                layout={'vertical'}
                initialValues={radar}
                onValuesChange={(changedValues) => {
                    if (Object.keys(changedValues)[0] === 'indexBy') {
                        setRadar((radar) => {
                            radar.data.map((datum) => {
                                datum[changedValues['indexBy']] = datum[radar['indexBy'].toString()];
                                delete datum[radar['indexBy'].toString()];
                            });

                            radar.indexBy = changedValues['indexBy'];
                        });
                    } else {
                        setPartialState(changedValues);
                    }
                }}
            >
                <Form.Item name={'maxValue'} label={t('Max Value')}>
                    <Slider min={0} max={1000} />
                </Form.Item>
                <Form.Item name={'indexBy'} label={t('Index By')}>
                    <Input />
                </Form.Item>
                <Form.Item name={'curve'} label={t('Curve')}>
                    <Select
                        options={[
                            {value: 'basisClosed', label: 'basisClosed'},
                            {value: 'cardinalClosed', label: 'cardinalClosed'},
                            {value: 'catmullRomClosed', label: 'catmullRomClosed'},
                            {value: 'linearClosed', label: 'linearClosed'},
                        ]}
                    />
                </Form.Item>
                <Form.Item name={'margin'} label={t('Margin')}>
                    <MarginInput />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
