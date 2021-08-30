import {Space} from 'antd';
import * as React from 'react';
import {FcDataSheet, FcTimeline, FcUpload} from 'react-icons/fc';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {setDataSource} from '../../features/app/appSlice';

const TypeButton = styled.button`
    display: 'block';
    width: 100%;
    height: 96px;
    background-color: white;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s;

    &:hover {
        background-color: #f2f3f5;
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
            <TypeButton onClick={() => dispatch(setDataSource('mock'))}>
                <Space direction={'vertical'}>
                    <FcTimeline />
                    模拟数据
                </Space>
            </TypeButton>
            <TypeButton onClick={() => dispatch(setDataSource('file'))}>
                <Space direction={'vertical'}>
                    <FcUpload />
                    上传数据
                </Space>
            </TypeButton>
            <TypeButton onClick={() => dispatch(setDataSource('sheet'))}>
                <Space direction={'vertical'}>
                    <FcDataSheet />
                    在线文档
                </Space>
            </TypeButton>
        </div>
    );
}
