import React from 'react';
import {useTranslation} from 'react-i18next';
import {FcLandscape} from 'react-icons/fc';
import {Param} from '../../../atoms/appAtom';
import useRadar from '../../../hooks/useRadar';
import ConfigPage from '../ConfigPage';
import {Form, Slider, Select} from 'antd';

export default function GridConfig({id}: Param) {
    const {radar, setPartialState} = useRadar(id);
    const {t} = useTranslation();

    return (
        <ConfigPage title={t('Grid')} icon={<FcLandscape />}>
            <Form
                layout={'vertical'}
                initialValues={radar}
                onValuesChange={(changedValues) => setPartialState(changedValues)}
            >
                <Form.Item name={'gridLevels'} label={t('Grid Levels')}>
                    <Slider min={1} max={12} />
                </Form.Item>
                <Form.Item name={'gridShape'} label={t('Grid Shape')}>
                    <Select
                        options={[
                            {value: 'circular', label: t('circular')},
                            {value: 'linear', label: t('linear')},
                        ]}
                    />
                </Form.Item>
                <Form.Item name={'gridLabelOffset'} label={t('Grid Label Offset')}>
                    <Slider min={0} max={60} />
                </Form.Item>
            </Form>
        </ConfigPage>
    );
}
