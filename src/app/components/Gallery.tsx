import {Tabs} from 'antd';
import * as React from 'react';
import {FcPuzzle} from 'react-icons/fc';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import DataMock from './Data/DataMock';
import DataSource from './Data/DataSource';
import DataTable from './Data/DataTable';
import DataUpload from './Data/DataUpload';
import {Rnd} from 'react-rnd';
import {Handle} from './StyledComponents/StyledComponents';
import {CameraFilled} from '@ant-design/icons';
import styled from 'styled-components';
import cryptoRandomString from 'crypto-random-string';
import {sendMessage} from '../utils/send-message';
import {SnapshotProps} from './Snapshot';
import Snapshot from './Snapshot/Snapshot';

const Shutter = styled.div`
    background: #f7f8fa;
    border-radius: 8px;
    margin-bottom: 8px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background: #f2f3f5;
    }

    &:active {
        background: #eeeeee;
    }
`;

export default function Gallery() {
    const {dataSource, chartType, snapshots} = useSelector((state: RootState) => state.app);
    const {bar, line} = useSelector((state: RootState) => state);
    const [height, setHeight] = React.useState('320px');
    const [width, setWidth] = React.useState('100%');
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(window.innerHeight - 320);

    function loadSnapShots() {
        sendMessage('load-snapshots');
    }

    React.useEffect(() => {
        loadSnapShots();
    }, []);

    function takeSnapShot() {
        const str = new XMLSerializer().serializeToString(document.querySelector('.canvas').querySelector('svg'));

        const snapShot: SnapshotProps = {
            state: chartType === 'bar' ? bar : line,
            svg: window.btoa(unescape(encodeURIComponent(str))),
            id: cryptoRandomString({length: 8}),
            type: chartType,
            title: 'untitled',
        };

        return snapShot;
    }

    function saveSnapShot(snapshot: SnapshotProps) {
        sendMessage('save-snapshot', snapshot);
    }

    return (
        <Rnd
            dragAxis={'none'}
            onResizeStop={(_e, _direction, ref, _delta, position) => {
                setHeight(ref.style.height);
                setWidth(ref.style.width);
                setX(position.x);
                setY(position.y);
            }}
            resizeHandleComponent={{
                top: <Handle pos={'top'} hovering={true} scale={1} />,
            }}
            position={{
                x: x,
                y: y,
            }}
            size={{
                width: width,
                height: height,
            }}
            style={{cursor: 'default'}}
        >
            <div className={'Gallery'} style={{padding: '0 12px', width: '100%', height: '100%', background: 'white'}}>
                <Tabs defaultActiveKey={'data'} style={{height: '100%'}}>
                    <Tabs.TabPane key={'data'} tab={'数据'} style={{height: '100%', overflow: 'scroll'}}>
                        {!dataSource ? (
                            <DataSource />
                        ) : dataSource === 'mock' ? (
                            <div style={{height: 240, overflow: 'scroll'}}>
                                <DataMock />
                                <DataTable />
                            </div>
                        ) : dataSource === 'file' ? (
                            <DataUpload />
                        ) : null}
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'gallery'} tab={'示例图表'} style={{height: '100%', overflow: 'scroll'}}>
                        <div
                            style={{display: 'flex', alignItems: 'center', marginBottom: 8}}
                            className={'Gallery__title'}
                        >
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
                            <Shutter
                                onClick={() => {
                                    saveSnapShot(takeSnapShot());
                                    loadSnapShots();
                                }}
                            >
                                <CameraFilled style={{color: 'gray'}} />
                            </Shutter>
                            {snapshots.map((i) => {
                                if (i.type === chartType) return <Snapshot snapshot={i} />;
                            })}
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Rnd>
    );
}
