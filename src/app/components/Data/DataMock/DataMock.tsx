// import {Serie} from '@nivo/line';
import {Button, Drawer, Form, InputNumber, Radio, Space} from 'antd';
import * as React from 'react';
import {useImmer} from 'use-immer';
// import {useDispatch} from 'react-redux';
import {generateDatumSequence} from '../../../utils/generateNumbers';
import cryptoRandomString from 'crypto-random-string';
import {Serie} from '@nivo/line';
import {useDispatch, useSelector} from 'react-redux';
import {setNewData} from '../../../features/chart/lineChartSlice';
import {FallOutlined, RiseOutlined} from '@ant-design/icons';
import Header from '../../Typography/Header';
import {setDataSource} from '../../../features/app/appSlice';
import {RootState} from '../../../redux/store';
import {setPartialState} from '../../../features/chart/barChartSlice';
import AdvancedConfig from './AdvancedConfig';
import {useTranslation} from 'react-i18next';
import {MockDataProps, mockLineData} from '../../../mock/mock-data';

export default function DataMock() {
    const dispatch = useDispatch();
    const {chartType} = useSelector((state: RootState) => state.app);
    const [showAdvancedSettings, setShowAdvancedSettings] = React.useState(false);
    const {decimalDigit} = useSelector((state: RootState) => state.dataMock);
    const [numberSequenceAttr, setNumberSequenceAttr] = useImmer<MockDataProps>({
        min: 0,
        max: 1000,
        length: 12,
        count: 1,
        trend: 'rise',
        decimalDigit: decimalDigit,
    });
    const {t} = useTranslation();

    React.useEffect(() => {
        setNumberSequenceAttr({...numberSequenceAttr, decimalDigit});
    }, [decimalDigit]);

    const [tempData, setTempData] = useImmer<Serie[]>([]);

    React.useEffect(() => {
        console.log(tempData);
        if (tempData.length > 0) {
            switch (chartType) {
                case 'line':
                    dispatch(setNewData(tempData));
                    break;
                case 'bar':
                    dispatch(setPartialState({data: tempData}));
                    break;
                default:
                    return;
            }
        }
    }, [tempData]);

    return (
        <div className={'data-mock'} style={{marginBottom: 8}}>
            <Space direction={'vertical'}>
                <Header showReturnButton onReturn={() => dispatch(setDataSource(null))}>
                    {t('Mock Data')}
                </Header>
                <Form
                    layout={'inline'}
                    initialValues={numberSequenceAttr}
                    onValuesChange={(changedValues) => {
                        setNumberSequenceAttr((draftState) => {
                            return Object.assign(draftState, changedValues);
                        });
                    }}
                >
                    <Form.Item name={'trend'} label={t('Trend')} fieldKey={'trend'}>
                        <Radio.Group
                            optionType={'button'}
                            options={[
                                {label: <RiseOutlined />, value: 'rise'},
                                {label: <FallOutlined />, value: 'fall'},
                                // {label: 'Normal Distribution', value: 'normal-distribution'},
                            ]}
                        ></Radio.Group>
                    </Form.Item>

                    <Form.Item name={'min'} label={t('Min')} fieldKey={'min'}>
                        <InputNumber style={{maxWidth: 48}} />
                    </Form.Item>
                    <Form.Item name={'max'} label={t('Max')} fieldKey={'max'}>
                        <InputNumber style={{maxWidth: 48}} />
                    </Form.Item>
                    <Form.Item name={'length'} label={t('Array Length')} fieldKey={'length'}>
                        <InputNumber style={{maxWidth: 48}} min={0} />
                    </Form.Item>
                    <Form.Item name={'count'} label={t('Count')} fieldKey={'count'}>
                        <InputNumber style={{maxWidth: 36}} min={0} />
                    </Form.Item>
                </Form>
                <Space size={4}>
                    <Button
                        onClick={() => {
                            const {count, length, min, max} = numberSequenceAttr;
                            let temp = [];
                            switch (chartType) {
                                case 'line':
                                    const series = mockLineData(numberSequenceAttr);
                                    temp = series;
                                    break;
                                case 'bar':
                                    let attrs = [];
                                    for (let i = 0; i < length; i++) {
                                        attrs.push(cryptoRandomString({length: 4}));
                                    }
                                    temp = [
                                        ...generateDatumSequence({
                                            attrs: attrs,
                                            length: count,
                                            min: min,
                                            max: max,
                                            decimalDigit: decimalDigit,
                                        }),
                                    ];
                                    dispatch(setPartialState({keys: attrs, indexBy: 'id'}));
                                    break;
                            }
                            setTempData(temp);
                        }}
                    >
                        {t('Mock Data')}
                    </Button>
                    <Button type={'link'} onClick={() => setShowAdvancedSettings(true)}>
                        {t('Advanced Settings')}
                    </Button>
                    <Drawer
                        title={t('Advanced Settings')}
                        placement="right"
                        onClose={() => setShowAdvancedSettings(false)}
                        visible={showAdvancedSettings}
                    >
                        <AdvancedConfig />
                    </Drawer>
                </Space>
            </Space>
        </div>
    );
}
