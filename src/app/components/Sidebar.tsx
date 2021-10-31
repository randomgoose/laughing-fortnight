import {Dropdown, Menu} from 'antd';
import * as React from 'react';
import {FcSettings} from 'react-icons/fc';
import {ChartTypeList} from './ChartTypeList';
import Settings from './Settings';

export default function SideBar() {
    return (
        <div className={'Sidebar App__sidebar flex flex-col justify-between border-r p-2'}>
            <ChartTypeList className={'flex-col'} tooltipPlacement={'right'} />
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
