import {Tooltip} from 'antd';
import * as React from 'react';
import {FcAreaChart, FcBarChart, FcLineChart, FcPieChart} from 'react-icons/fc';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {setChartType} from '../features/app/appSlice';
import {RootState} from '../redux/store';

const SidebarButton = styled.button`
    width: 28px;
    height: 28px;
    border: none;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
        background-color: #f2f2f2;
    }

    &:active {
        background-color: #e5e6eb;
    }

    &:not(:last-child) {
        margin-bottom: 8px;
    }

    cursor: pointer;
`;

function ChartType({type, children}: {type?: 'line' | 'bar' | 'pie' | 'area'; children?: React.ReactNode}) {
    const dispatch = useDispatch();
    const {chartType} = useSelector((state: RootState) => state.app);

    return (
        <Tooltip title={type[0].toUpperCase() + type.slice(1)} placement={'right'}>
            <SidebarButton
                style={{backgroundColor: type === chartType ? '#e5e6eb' : 'white'}}
                onClick={() => (type ? dispatch(setChartType(type)) : null)}
            >
                {children}
            </SidebarButton>
        </Tooltip>
    );
}

export default function SideBar() {
    return (
        <div
            className={'Sidebar App__sidebar'}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRight: '1px solid rgba(0, 0, 0, .1)',
                alignItems: 'center',
                padding: 8,
            }}
        >
            <ChartType type={'bar'}>
                <FcBarChart size={24} />
            </ChartType>
            <ChartType type={'line'}>
                <FcLineChart size={24} />
            </ChartType>
            <ChartType type={'pie'}>
                <FcPieChart size={24} />
            </ChartType>
            <ChartType type={'area'}>
                <FcAreaChart size={24} />
            </ChartType>
        </div>
    );
}
