import * as React from 'react';
import {useClickAway} from 'ahooks';
import {InputNumber} from 'antd';
import {useRef} from 'react';
import {useImmer} from 'use-immer';

interface Props {
    value: number;
    onFinishEditing: (value: number) => void;
}

export default function EditableDiv({value, onFinishEditing}: Props) {
    const [editing, setEditing] = useImmer(false);
    const [temp, setTemp] = useImmer(value);
    const ref = useRef(null);

    useClickAway(() => {
        setEditing(false);
        onFinishEditing(temp);
    }, ref);

    return editing ? (
        <div ref={ref}>
            <InputNumber
                autoFocus
                value={temp}
                onChange={(value) => {
                    setTemp(value);
                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        setEditing(false);
                        onFinishEditing(temp);
                    }
                }}
            />
        </div>
    ) : (
        <div
            className={'editable-div'}
            onClick={() => {
                setEditing(true);
            }}
        >
            {value}
        </div>
    );
}
