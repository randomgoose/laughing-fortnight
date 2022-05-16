import {DeleteFilled, PlusOutlined} from '@ant-design/icons';
import {Button, IconButton} from '@chakra-ui/button';
import {Table} from 'antd';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Param} from '../../../atoms/appAtom';
import useRadar from '../../../hooks/useRadar';
import EditableDiv from '../../CustomInput/EditableDiv';

export default function RadarDataTable({id}: Param) {
    const {radar, setRadar, changeDataByIndex, addAttribute, addSerie, removeAttribute} = useRadar(id);

    React.useEffect(() => {
        console.log(radar);
    }, [radar]);

    const {t} = useTranslation();

    return (
        <Table
            scroll={{y: 140}}
            rowKey={radar['indexBy'].toString()}
            dataSource={radar.data}
            columns={[
                {
                    dataIndex: radar['indexBy'].toString(),
                    title: (
                        <EditableDiv
                            value={radar['indexBy'].toString()}
                            onFinishEditing={(value: string) => {
                                if (value !== radar['indexBy'])
                                    setRadar((radar) => {
                                        radar.data.map((datum) => {
                                            datum[value] = datum[radar['indexBy'].toString()];
                                            delete datum[radar['indexBy'].toString()];
                                        });

                                        radar.indexBy = value;
                                    });
                            }}
                        />
                    ),
                    render: (value) => (
                        <EditableDiv
                            value={value}
                            onFinishEditing={(newValue) => {
                                setRadar((draftState) => {
                                    draftState.data.find((datum) => datum[radar['indexBy'].toString()] === value)[
                                        radar['indexBy'].toString()
                                    ] = newValue;
                                });
                            }}
                        />
                    ),
                },
                ...radar.keys.map((key) => ({
                    dataIndex: key,
                    title: () => (
                        <div className={'flex items-center gap-2'}>
                            {key}
                            <IconButton
                                onClick={() =>
                                    setRadar((draftState) => {
                                        draftState.data.map((datum) => {
                                            delete datum[key];
                                        });
                                        draftState.keys = draftState.keys.filter((name) => name !== key);
                                    })
                                }
                                size={'xs'}
                                icon={<DeleteFilled />}
                                aria-label={'remove serie'}
                            />
                        </div>
                    ),
                    render: (value, item) => (
                        <EditableDiv
                            value={value}
                            onFinishEditing={(value: string) => {
                                changeDataByIndex(item[radar['indexBy'].toString()], key, value as unknown as number);
                            }}
                        />
                    ),
                })),
                {
                    dataIndex: 'actions',
                    title: 'Actions',
                    render: (_value, item) => (
                        <IconButton
                            icon={<DeleteFilled />}
                            size={'xs'}
                            aria-label={'remove attribute'}
                            onClick={() => removeAttribute(item[radar.indexBy.toString()])}
                        />
                    ),
                },
                {
                    dataIndex: 'serie',
                    title: (
                        <IconButton size={'xs'} icon={<PlusOutlined />} aria-label={'add serie'} onClick={addSerie} />
                    ),
                },
            ]}
            footer={() => (
                <Button size={'xs'} onClick={addAttribute}>
                    {t('Add attribute')}
                </Button>
            )}
        />
    );
}
