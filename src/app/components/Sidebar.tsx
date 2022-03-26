import {IconButton} from '@chakra-ui/react';
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
                <IconButton icon={<FcSettings />} aria-label={'Settings'} size={'xs'} bg={'white'}></IconButton>
            </Dropdown>
        </div>
    );
}
