import * as React from 'react';
import {useClickAway, useKeyPress} from 'ahooks';
import {InputNumber, Input} from 'antd';
import {useRef} from 'react';
import {useImmer} from 'use-immer';

interface Props {
    value: number | string;
    onFinishEditing?: (value: number | string) => void;
    validate?: (value: number | string) => boolean;
}

export default function EditableDiv({value, onFinishEditing, validate}: Props) {
    const [editing, setEditing] = useImmer(false);
    const [temp, setTemp] = useImmer(value);
    const ref = useRef(null);

    function finishEditing() {
        if (validate) {
            if (!validate(temp)) {
                setEditing(false);
            } else {
                setEditing(true);
            }
        } else {
            setEditing(false);
        }

        onFinishEditing(temp);
    }

    useClickAway(() => {
        finishEditing();
    }, ref);

    useKeyPress('Enter', (e) => {
        e.preventDefault();
        editing ? finishEditing() : null;
    });

    return editing ? (
        <div ref={ref}>
            {typeof value === 'string' ? (
                <Input
                    onBlur={() => {
                        finishEditing();
                    }}
                    autoFocus
                    value={temp}
                    onChange={(e) => {
                        setTemp(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            setEditing(false);
                            onFinishEditing(temp);
                        }
                    }}
                />
            ) : (
                <InputNumber
                    onBlur={() => {
                        finishEditing();
                    }}
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
            )}
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
