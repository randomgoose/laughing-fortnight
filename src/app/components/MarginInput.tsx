import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setMargin} from '../features/chart/lineChartSlice';
import {RootState} from '../redux/store';
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

export default function MarginInput() {
    const {left, right, bottom, top} = useSelector((state: RootState) => state.line.margin);
    const [editingMargin, setEditingMargin] = useState('');

    function focusHandler(value) {
        setEditingMargin(value);
    }

    const dispatch = useDispatch();
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
                    value={top}
                    style={{width: '100%'}}
                    onChange={(value) => dispatch(setMargin({top: value}))}
                    onFocus={() => focusHandler('top')}
                    onBlur={() => setEditingMargin(null)}
                />
                <InputNumber
                    type={'number'}
                    className={'margin-left'}
                    value={left}
                    style={{width: '100%'}}
                    onChange={(value) => dispatch(setMargin({left: value}))}
                    onFocus={() => focusHandler('left')}
                    onBlur={() => setEditingMargin(null)}
                />
                <InputNumber
                    type={'number'}
                    className={'margin-right'}
                    value={right}
                    style={{width: '100%'}}
                    onChange={(value) => dispatch(setMargin({right: value}))}
                    onFocus={() => focusHandler('right')}
                    onBlur={() => setEditingMargin(null)}
                />
                <InputNumber
                    type={'number'}
                    className={'margin-bottom'}
                    value={bottom}
                    style={{width: '100%'}}
                    onChange={(value) => dispatch(setMargin({bottom: value}))}
                    onFocus={() => focusHandler('bottom')}
                    onBlur={() => setEditingMargin(null)}
                />
            </div>
        </div>
    );
}
