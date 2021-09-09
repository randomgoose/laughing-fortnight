import {DeleteOutlined} from '@ant-design/icons';
import {Button, Popconfirm} from 'antd';
import * as React from 'react';
import {SnapshotProps} from '.';
import {sendMessage} from '../../utils/send-message';

export default function Snapshot({snapshot}: {snapshot: SnapshotProps}) {
    const [showDeleteButton, setShowDeleteButton] = React.useState(false);
    return (
        <div className={'Sample'}>
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
                }}
                className={'Sample__image'}
                // onClick={onClick}
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
                <img src={'data:image/svg+xml;base64,' + snapshot.svg} height={'100%'} />
            </div>
            {snapshot.title}
            {/* <EditableDiv
                onFinishEditing={(value: string) => {
                    onChangeTitle(value);
                }}
                value={title}
            /> */}
        </div>
    );
}
