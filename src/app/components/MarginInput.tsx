import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setMargin} from '../features/chart/lineChartSlice';
import {RootState} from '../redux/store';
import {InputNumber} from 'antd';

export default function MarginInput() {
    const {left, right, bottom, top} = useSelector((state: RootState) => state.chart.margin);

    const dispatch = useDispatch();
    return (
        <div
            className={'margin-input'}
            style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                columnGap: 4,
                rowGap: 4,
            }}
        >
            <InputNumber
                type={'number'}
                className={'margin-top'}
                value={top}
                style={{width: '100%'}}
                onChange={(value) => dispatch(setMargin({top: value}))}
            />
            <InputNumber
                type={'number'}
                className={'margin-left'}
                value={left}
                style={{width: '100%'}}
                onChange={(value) => dispatch(setMargin({left: value}))}
            />
            <InputNumber
                type={'number'}
                className={'margin-right'}
                value={right}
                style={{width: '100%'}}
                onChange={(value) => dispatch(setMargin({right: value}))}
            />
            <InputNumber
                type={'number'}
                className={'margin-bottom'}
                value={bottom}
                style={{width: '100%'}}
                onChange={(value) => dispatch(setMargin({bottom: value}))}
            />
        </div>
    );
}
