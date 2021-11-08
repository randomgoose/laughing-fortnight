import {Pie} from '@nivo/pie';
import {useAtom} from 'jotai';
import * as React from 'react';
import {pieAtomFamily} from '../../atoms/pieAtomFamily';
import ColorScheme, {IColorScheme} from './ColorScheme';

const baseColorSchemes = [
    {
        id: 'awdaw2',
        name: 'test',
        colors: ['#ffe400', '#000000'],
    },
    {
        id: 'daoie123',
        name: 'test2',
        colors: ['#021f33', '#fe9203', '#ff0000', '#00ff46', '#0000F2'],
    },
];

export default function ColorSchemeBuilder() {
    const [pie] = useAtom(pieAtomFamily({id: 'example__pie'}));
    const [activeColorScheme, setActiveColorScheme] = React.useState<IColorScheme>(null);

    return (
        <div className={'ColorSchemeBuilder'}>
            <div className={'ColorSchemeBuilder__SchemeList flex gap-2 mb-4'}>
                {baseColorSchemes.map((scheme) => (
                    <ColorScheme {...scheme} key={scheme.id} onClick={() => setActiveColorScheme(scheme)} />
                ))}
            </div>

            <div
                className={
                    'ColorSchemeBuilder__Preview w-full h-96 bg-gray-50 border rounded-lg flex items-center justify-center'
                }
            >
                <Pie {...pie} colors={activeColorScheme ? activeColorScheme.colors : {scheme: 'nivo'}} />
            </div>
        </div>
    );
}
