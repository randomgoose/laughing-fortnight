import {ComputedDatum, DefaultRawDatum} from '@nivo/pie';
import {Button} from 'antd';
import * as React from 'react';
import EditableDiv from '../CustomInput/EditableDiv';
import {DeleteOutlined} from '@ant-design/icons';
import {usePie} from '../../hooks/usePie';

export default function PieWidget({
    id,
    visible,
    activeArc,
}: {
    id: string;
    visible: boolean;
    activeArc: Omit<ComputedDatum<DefaultRawDatum>, 'index' | 'indexValue'>;
}) {
    const {removeArcById} = usePie(id);
    return activeArc ? (
        <div
            className={`w-60 h-60 shadow-2xl rounded-lg p-4 bg-white absolute -right-64 top-0 transition-all transform ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            <div className={'w-4 h-4'} style={{background: activeArc.color}}></div>
            <EditableDiv value={activeArc.value} />
            <Button icon={<DeleteOutlined />} danger block onClick={() => removeArcById(activeArc.id as string)}>
                删除
            </Button>
        </div>
    ) : null;
}
