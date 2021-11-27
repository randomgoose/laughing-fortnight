import {PlusOutlined} from '@ant-design/icons';
import {Pie} from '@nivo/pie';
import cryptoRandomString from 'crypto-random-string';
import {useAtom} from 'jotai';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {pieAtomFamily} from '../../atoms/pieAtomFamily';
import ColorScheme, {IColorScheme} from './ColorScheme';
import {Heading, Stack} from '@chakra-ui/react';

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

export default function ColorSchemeBuilder({
    onCreateColorScheme,
}: {
    onCreateColorScheme?: (colorScheme: IColorScheme) => void;
}) {
    const [pie] = useAtom(pieAtomFamily({id: 'example__pie'}));
    const [activeColorScheme, setActiveColorScheme] = React.useState<IColorScheme>(null);
    const {t} = useTranslation();

    function createColorScheme(): IColorScheme {
        const id = cryptoRandomString({length: 4});
        const name = 'new color scheme';
        return {id, name, colors: []};
    }

    return (
        <div className={'ColorSchemeBuilder'}>
            <div className={'ColorSchemeBuilder__SchemeList flex gap-2 mb-4'}>
                {baseColorSchemes.map((scheme) => (
                    <ColorScheme {...scheme} key={scheme.id} onClick={() => setActiveColorScheme(scheme)} />
                ))}
                <button
                    className={
                        'relative border border-dashed rounded-lg w-32 h-24 overflow-hidden flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer'
                    }
                    onClick={() => {
                        const scheme = createColorScheme();
                        onCreateColorScheme(scheme);
                    }}
                >
                    <PlusOutlined />
                    {t('Create a color scheme')}
                </button>
            </div>

            <Stack spacing={'8px'}>
                <Heading>{t('Preview')}</Heading>

                <div
                    className={
                        'ColorSchemeBuilder__Preview w-full h-96 bg-gray-50 border rounded-lg flex items-center justify-center'
                    }
                >
                    <Pie {...pie} colors={activeColorScheme ? activeColorScheme.colors : {scheme: 'nivo'}} />
                </div>
            </Stack>
        </div>
    );
}
