import * as React from 'react';
import {IconButton} from '@chakra-ui/button';
import {EditOutlined} from '@ant-design/icons';
import Icon from '@chakra-ui/icon';

export interface IColorScheme {
    id: string;
    name: string;
    colors: string[];
}

export default function ColorScheme({name, colors, onClick}: IColorScheme & {onClick?: () => void}) {
    return (
        <div
            className={
                'ColorScheme relative border rounded-lg w-32 h-24 overflow-hidden flex flex-col transition-all duration-200 cursor-pointer'
            }
            onClick={onClick}
        >
            <IconButton
                aria-label={'edit-button'}
                icon={<Icon as={EditOutlined} />}
                position={'absolute'}
                top={1}
                right={1}
                size={'sm'}
                onClick={(e) => {
                    e.preventDefault();
                }}
            />
            <div className={'ColorScheme__palette flex h-full w-full'}>
                {colors.map((color, index) => (
                    <div style={{background: color}} className={'w-full'} key={index}></div>
                ))}
            </div>
            <div className={'p-2 h-12 font-bold'}>{name}</div>
        </div>
    );
}
