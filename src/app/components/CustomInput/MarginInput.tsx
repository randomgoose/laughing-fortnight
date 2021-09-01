import * as React from 'react';
import {InputNumber, Space} from 'antd';
import styled from 'styled-components';
import {useState} from 'react';

const Box = styled.div`
    border-right: ${(props) =>
        props['data-editingMargin'] === 'right' ? '3px solid lightblue' : '1px solid lightgray'};
    border-left: ${(props) => (props['data-editingMargin'] === 'left' ? '3px solid lightblue' : '1px solid lightgray')};
    border-top: ${(props) => (props['data-editingMargin'] === 'top' ? '3px solid lightblue' : '1px solid lightgray')};
    border-bottom: ${(props) =>
        props['data-editingMargin'] === 'bottom' ? '3px solid lightblue' : '1px solid lightgray'};
    width: 96px;
`;

interface Props {
    value?: {left: number; right: number; bottom: number; top: number};
    onChange?: (value: {left: number; right: number; bottom: number; top: number}) => void;
}

export default function MarginInput(props: Props) {
    const [values, setValues] = useState({top: 50, right: 110, bottom: 50, left: 60});
    // const {left, right, bottom, top} = useSelector((state: RootState) => state.line.margin);
    const [editingMargin, setEditingMargin] = useState('');

    function focusHandler(value) {
        setEditingMargin(value);
    }

    function handleChange(value: {left: number; right: number; bottom: number; top: number}) {
        setValues(Object.assign(values, value));
        props.onChange(value);
    }

    return (
        <div className={'MarginInput'} style={{display: 'flex', width: '100%'}}>
            <Space></Space>
            <Box className={'MarginInput__box'} data-editingMargin={editingMargin} />
            <div
                className={'MarginInput__group'}
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    columnGap: 4,
                    rowGap: 4,
                    marginLeft: 4,
                    width: '100%',
                }}
            >
                <InputNumber
                    type={'number'}
                    className={'margin-top'}
                    value={props.value.top || values.top}
                    style={{width: '100%'}}
                    onFocus={() => focusHandler('top')}
                    onBlur={() => setEditingMargin(null)}
                    onChange={(value) => handleChange({...(values || props.value), top: value})}
                />
                <InputNumber
                    type={'number'}
                    className={'margin-left'}
                    value={props.value.left || values.left}
                    style={{width: '100%'}}
                    onFocus={() => focusHandler('left')}
                    onBlur={() => setEditingMargin(null)}
                    onChange={(value) => handleChange({...(values || props.value), left: value})}
                />
                <InputNumber
                    type={'number'}
                    className={'margin-right'}
                    value={props.value.right || values.right}
                    style={{width: '100%'}}
                    onFocus={() => focusHandler('right')}
                    onBlur={() => setEditingMargin(null)}
                    onChange={(value) => handleChange({...(values || props.value), right: value})}
                />
                <InputNumber
                    type={'number'}
                    className={'margin-bottom'}
                    value={props.value.bottom || values.bottom}
                    style={{width: '100%'}}
                    onFocus={() => focusHandler('bottom')}
                    onBlur={() => setEditingMargin(null)}
                    onChange={(value) => handleChange({...(values || props.value), bottom: value})}
                />
            </div>
        </div>
    );
}
