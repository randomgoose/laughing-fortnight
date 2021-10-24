import {Dropdown, Menu, Tooltip} from 'antd';
import * as React from 'react';
import {FcBarChart, FcLineChart, FcPieChart, FcSettings} from 'react-icons/fc';
import {useDispatch, useSelector} from 'react-redux';
import {setChartType} from '../features/app/appSlice';
import {RootState} from '../redux/store';
import {useTranslation} from 'react-i18next';
import Settings from './Settings';

function ChartType({type, children}: {type?: 'line' | 'bar' | 'pie' | 'area'; children?: React.ReactNode}) {
    const dispatch = useDispatch();
    const {chartType} = useSelector((state: RootState) => state.app);
    const {t} = useTranslation();

    return (
        <Tooltip title={t(type[0].toUpperCase() + type.slice(1))} placement={'right'}>
            <button
                className={`w-7 h-7 flex justify-center items-center rounded-lg transition-all duration-200 hover:bg-gray-100 active:bg-gray-200 ${
                    type === chartType ? 'bg-gray-200' : 'bg-white'
                }`}
                onClick={() => type && dispatch(setChartType(type))}
            >
                {children}
            </button>
        </Tooltip>
    );
}

export default function SideBar() {
    return (
        <div className={'Sidebar App__sidebar flex flex-col justify-between border-r p-2'}>
            <div className={'App__sidebar-button-group flex flex-col gap-1'}>
                <ChartType type={'bar'}>
                    <FcBarChart size={16} />
                </ChartType>
                <ChartType type={'line'}>
                    <FcLineChart size={16} />
                </ChartType>
                <ChartType type={'pie'}>
                    <FcPieChart size={16} />
                </ChartType>
                {/* <ChartType type={'area'}>
                <FcAreaChart size={24} />
            </ChartType> */}
            </div>
            <Dropdown
                overlay={
                    <Menu className={'p-4 rounded-lg border border-1 border-gray-200'}>
                        <Settings />
                    </Menu>
                }
                className={'App__settings'}
            >
                <button
                    className={
                        'w-7 h-7 flex justify-center items-center rounded-lg transition-all duration-200 hover:bg-gray-100 active:bg-gray-200'
                    }
                >
                    <FcSettings />
                </button>
            </Dropdown>
        </div>
    );
}
