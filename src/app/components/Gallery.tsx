import {Tabs} from 'antd';
import * as React from 'react';
import {FcPuzzle} from 'react-icons/fc';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import DataMock from './Data/DataMock';
import DataSource from './Data/DataSource';
import DataTable from './Data/DataTable';
import DataUpload from './Data/DataUpload';

function Sample({title}: {title: string}) {
    return (
        <div className={'Sample'}>
            <div
                style={{
                    background: 'lightgray',
                    borderRadius: 8,
                    marginBottom: 8,
                    height: 120,
                }}
                className={'Sample__image'}
            ></div>
            <div className={'Sample__title'}>{title}</div>
        </div>
    );
}

export default function Gallery() {
    const {dataSource} = useSelector((state: RootState) => state.app);

    return (
        <div className={'Gallery'} style={{padding: 16, width: '100%', minHeight: 480}}>
            <Tabs defaultActiveKey={'data'}>
                <Tabs.TabPane key={'data'} tab={'数据'}>
                    {!dataSource ? (
                        <DataSource />
                    ) : dataSource === 'mock' ? (
                        <>
                            <DataMock />
                            <DataTable />
                        </>
                    ) : dataSource === 'file' ? (
                        <DataUpload />
                    ) : null}
                </Tabs.TabPane>
                <Tabs.TabPane key={'gallery'} tab={'示例图表'}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: 8}} className={'Gallery__title'}>
                        <FcPuzzle style={{marginRight: 8}} />
                        <span style={{fontSize: 16, lineHeight: 1.5, fontWeight: 'bold'}}>示例图表</span>
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            columnGap: 8,
                            rowGap: 8,
                            width: '100%',
                            height: 240,
                        }}
                        className={'Gallery__display'}
                    >
                        <Sample title={'双线图'} />
                        <Sample title={'双线图'} />
                        <Sample title={'双线图'} />
                        <Sample title={'双线图'} />
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}
