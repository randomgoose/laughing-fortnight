import * as React from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {setDataSource} from '../../features/app/appSlice';

const TypeButton = styled.button`
    display: 'block';
    width: 100%;
    height: 50%;
    background-color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: lightgray;
    }

    &:not(:last-child) {
        margin-right: 16px;
    }
`;

export default function DataSource() {
    const dispatch = useDispatch();
    return (
        <div
            className={'data-type'}
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <TypeButton onClick={() => dispatch(setDataSource('mock'))}>模拟数据</TypeButton>
            <TypeButton onClick={() => dispatch(setDataSource('file'))}>上传数据</TypeButton>
            <TypeButton onClick={() => dispatch(setDataSource('sheet'))}>在线文档</TypeButton>
        </div>
    );
}
