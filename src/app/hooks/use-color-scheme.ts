import {useAtom} from 'jotai';
import {IColorScheme} from '../../types';
import {colorSchemeFamily, ColorSchemeAtom} from '../atoms/colors';
import {ColorSchemeId} from '@nivo/colors';
import * as React from 'react';

export function useColorScheme(id: string) {
    const [colorScheme] = useAtom<IColorScheme | {scheme: ColorSchemeId}>(colorSchemeFamily({id}) as ColorSchemeAtom);
    const [colors, setColors] = React.useState<{scheme: ColorSchemeId} | string[]>(
        'scheme' in colorScheme ? colorScheme : colorScheme.colors.map((color) => color.value)
    );

    React.useEffect(() => {
        if ('scheme' in colorScheme) {
            setColors(colorScheme);
        } else {
            setColors(colorScheme.colors.map((color) => color.value));
        }
    }, [colorScheme, id]);

    return {colors};
}
