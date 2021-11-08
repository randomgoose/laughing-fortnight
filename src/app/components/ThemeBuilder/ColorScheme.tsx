import * as React from 'react';

export interface IColorScheme {
    id: string;
    name: string;
    colors: string[];
}

export default function ColorScheme({name, colors, onClick}: IColorScheme & {onClick?: () => void}) {
    return (
        <div
            className={
                'ColorScheme border rounded-lg w-32 h-24 overflow-hidden flex flex-col transition-all duration-200 transform hover:shadow-md hover:-translate-y-1 cursor-pointer'
            }
            onClick={onClick}
        >
            <div className={'ColorScheme__palette flex h-full w-full'}>
                {colors.map((color) => (
                    <div style={{background: color}} className={'w-full'}></div>
                ))}
            </div>
            <div className={'p-2 h-12 font-bold'}>{name}</div>
        </div>
    );
}
