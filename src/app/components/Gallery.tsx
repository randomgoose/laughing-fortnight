import {Tabs} from 'antd';
import * as React from 'react';
import {FcPuzzle} from 'react-icons/fc';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import DataTable from './Data/DataTable';
import {Rnd} from 'react-rnd';
import {CameraFilled} from '@ant-design/icons';
import styled from 'styled-components';
import cryptoRandomString from 'crypto-random-string';
import {sendMessage} from '../utils/send-message';
import {SnapshotProps} from './Snapshot';
import Snapshot from './Snapshot/Snapshot';
import {useTranslation} from 'react-i18next';

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
    const {chartType, snapshots} = useSelector((state: RootState) => state.app);
    const {bar, line} = useSelector((state: RootState) => state);
    const [height, setHeight] = React.useState('320px');
    const [width, setWidth] = React.useState('100%');
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(window.innerHeight - 320);
    const {t} = useTranslation();

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
                top: (
                    <div
                        className={'absolute left-1/2 -top-1 w-6 h-1 bg-gray-200 rounded border border-gray-500'}
                    ></div>
                ),
            }}
            position={{
                x: x,
                y: y,
            }}
            size={{
                width: width,
                height: height,
            }}
            className={'cursor-default'}
        >
            <div className={'Gallery'} style={{padding: '0 12px', width: '100%', height: '100%', background: 'white'}}>
                <Tabs defaultActiveKey={'data'} style={{height: '100%'}}>
                    <Tabs.TabPane key={'data'} tab={t('Data')}>
                        <DataTable />
                    </Tabs.TabPane>
                    <Tabs.TabPane className={'h-full'} key={'gallery'} tab={t('Samples')}>
                        <div className={'Gallery__title flex items-center mb-2'}>
                            <FcPuzzle className={'mr-2'} />
                            <span style={{fontSize: 16, lineHeight: 1.5, fontWeight: 'bold'}}>{t('Samples')}</span>
                        </div>
                        <div className={'Gallery__display grid grid-cols-4 gap-4 w-full h-60'}>
                            <Shutter
                                onClick={() => {
                                    saveSnapShot(takeSnapShot());
                                    loadSnapShots();
                                }}
                            >
                                <CameraFilled style={{color: 'gray'}} />
                            </Shutter>
                            {snapshots
                                ? snapshots.map((i) => {
                                      if (i.type === chartType) return <Snapshot snapshot={i} />;
                                  })
                                : []}
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Rnd>
    );
}
