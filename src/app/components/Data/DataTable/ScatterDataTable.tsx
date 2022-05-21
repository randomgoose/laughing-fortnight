import * as React from 'react';
import {Button, Form, InputNumber, Space, Table, Tabs} from 'antd';
import {appAtom, Param} from '../../../atoms/appAtom';
import {useScatter} from '../../../hooks/useScatter';
import {useTranslation} from 'react-i18next';
import {DeleteOutlined} from '@ant-design/icons';
import EditableDiv from '../../CustomInput/EditableDiv';
import {useAtom} from 'jotai';
import cryptoRandomString from 'crypto-random-string';
import {useImmer} from 'use-immer';

export default function ScatterDataTable({id}: Param) {
    const [{decimalDigit}] = useAtom(appAtom);
    const {scatter, addPoint, changeGroupName, setNewData, removeGroup} = useScatter(id);
    const [attrs, setAttrs] = useImmer({groups: 3, pointsPerGroup: 20, minX: 0, maxX: 100, minY: 0, maxY: 100});
    const {t} = useTranslation();

    React.useEffect(() => {
        console.log(attrs);
    }, [attrs]);

    return (
        <>
            <Form
                className={'mb-2'}
                initialValues={attrs}
                onValuesChange={(changedValues) => {
                    setAttrs((draftState) => {
                        draftState = Object.assign(draftState, changedValues);
                    });
                }}
                layout={'inline'}
            >
                <Form.Item name={'groups'} label={t('Groups')}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'pointsPerGroup'} label={t('Points per group')}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'minX'} label={t('Min X')}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'maxX'} label={t('Max X')}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'minY'} label={t('Min Y')}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={'maxY'} label={t('Max Y')}>
                    <InputNumber />
                </Form.Item>
            </Form>
            <Button
                className={'mb-2'}
                onClick={() => {
                    let newData: {id: string; data: {x: number; y: number}[]}[] = [];
                    for (let i = 0; i < attrs.groups; i++) {
                        let points: {x: number; y: number}[] = [];
                        for (let j = 0; j < attrs.pointsPerGroup; j++) {
                            points.push({
                                x: parseFloat(
                                    (Math.random() * (attrs.maxX - attrs.minX) + attrs.minX).toFixed(decimalDigit)
                                ),
                                y: parseFloat(
                                    (Math.random() * (attrs.maxY - attrs.minY) + attrs.minY).toFixed(decimalDigit)
                                ),
                            });
                        }
                        newData.push({id: cryptoRandomString({length: 4}), data: points});
                    }
                    setNewData(newData);
                }}
            >
                {t('Mock Data')}
            </Button>
            <Tabs type={'card'}>
                {scatter.data &&
                    scatter.data.map((datum) => {
                        return (
                            <Tabs.TabPane
                                tab={
                                    <Space align={'center'} size={4}>
                                        <EditableDiv
                                            value={datum.id}
                                            onFinishEditing={(value) => {
                                                changeGroupName(datum.id + '', value + '');
                                            }}
                                        />
                                        <Button icon={<DeleteOutlined />} onClick={() => removeGroup(datum.id + '')} />
                                    </Space>
                                }
                                tabKey={datum.id + ''}
                                key={datum.id + ''}
                            >
                                <Table
                                    rowKey={'x'}
                                    dataSource={datum.data}
                                    scroll={{y: 140}}
                                    columns={[
                                        {
                                            dataIndex: 'x',
                                            title: 'x',
                                        },
                                        {
                                            dataIndex: 'y',
                                            title: 'y',
                                        },
                                    ]}
                                    footer={() => (
                                        <Button
                                            onClick={() => {
                                                addPoint(datum.id + '', Math.random() * 100, Math.random() * 100);
                                            }}
                                        >
                                            {t('Add row')}
                                        </Button>
                                    )}
                                />
                            </Tabs.TabPane>
                        );
                    })}
            </Tabs>
        </>
    );
}
