import {DeleteOutlined} from '@ant-design/icons';
import {Button, Popconfirm} from 'antd';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SnapshotProps} from '.';
import {setPartialState as setLine} from '../../features/chart/lineChartSlice';
import {setPartialState as setBar} from '../../features/chart/barChartSlice';

import {RootState} from '../../redux/store';
import {sendMessage} from '../../utils/send-message';
import EditableDiv from '../CustomInput/EditableDiv';

export default function Snapshot({snapshot}: {snapshot: SnapshotProps}) {
    const [showDeleteButton, setShowDeleteButton] = React.useState(false);
    const {chartType} = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    function setData(state) {
        if (chartType === 'bar') {
            dispatch(setBar({...state}));
        } else if (chartType === 'line') {
            dispatch(setLine({...state}));
        }
    }

    return (
        <div className={'Snapshot'}>
            <div
                style={{
                    background: '#f2f3f5',
                    borderRadius: 8,
                    marginBottom: 8,
                    height: 120,
                    width: '100%',
                    textAlign: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                className={'Sample__image'}
                onClick={() => setData(snapshot.state)}
                onMouseEnter={() => setShowDeleteButton(true)}
                onMouseLeave={() => setShowDeleteButton(false)}
            >
                <Popconfirm
                    title={'确认删除此 Demo'}
                    onConfirm={() => {
                        sendMessage('delete-snapshot', snapshot.id);
                    }}
                >
                    <Button
                        style={{
                            position: 'absolute',
                            right: 12,
                            top: 12,
                            opacity: showDeleteButton ? 1 : 0,
                            transition: 'all .2s',
                        }}
                        icon={<DeleteOutlined />}
                    ></Button>
                </Popconfirm>
                <img src={'data:image/svg+xml;base64,' + snapshot.svg} width={'80%'} />
            </div>
            <EditableDiv
                onFinishEditing={(value: string) => {
                    sendMessage('edit-snapshot', {id: snapshot.id, values: {title: value}});
                }}
                value={snapshot.title}
            />
        </div>
    );
}
