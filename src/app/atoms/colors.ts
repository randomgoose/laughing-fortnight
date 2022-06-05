import {atom, PrimitiveAtom} from 'jotai';
import {atomFamily} from 'jotai/utils';
import {SAVE_COLOR_SCHEME} from '../../plugin/message-types';
import {IColorScheme} from '../../types';
import {colorSchemes} from '@nivo/colors';
import cryptoRandomString from 'crypto-random-string';

export type ColorSchemeAtom = PrimitiveAtom<IColorScheme>;

export const colorSchemeAtoms = atom<ColorSchemeAtom[]>([]);

export type ColorSchemeParam = {
    id: string;
    initial?: Omit<IColorScheme, 'id'>;
};

export const colorSchemeFamily = atomFamily<ColorSchemeParam, ColorSchemeAtom | PrimitiveAtom<{scheme: string}>>(
    (param: ColorSchemeParam) => {
        if (param.id in colorSchemes) {
            return atom({scheme: param.id});
        } else {
            return atom(
                param.initial
                    ? {...param.initial, id: param.id}
                    : {
                          colors: [
                              '#0000b3',
                              '#0010d9',
                              '#0020ff',
                              '#0040ff',
                              '#0060ff',
                              '#0080ff',
                              '#009fff',
                              '#00bfff',
                              '#00ffff',
                          ].map((hex) => ({
                              id: cryptoRandomString({length: 12}),
                              value: hex,
                          })),
                          name: 'New Scheme',
                          id: param.id,
                      }
            );
        }
    },
    (a: ColorSchemeParam, b: ColorSchemeParam) => a.id === b.id
);

export const getColorSchemesAtom = atom((get) => {
    const atoms = get(colorSchemeAtoms);
    return atoms.map((atom) => get(atom));
});

export const addColorSchemeAtom = atom(null, (_get, set, update: PrimitiveAtom<IColorScheme>) => {
    set(colorSchemeAtoms, (prev) => [...prev, update]);
});

export const deleteColorSchemeAtom = atom(null, (_get, set, update: PrimitiveAtom<IColorScheme>) => {
    set(colorSchemeAtoms, (prev) => prev.filter((atom) => atom !== update));
});

export const saveColorScheme = (scheme: IColorScheme) => {
    return window.parent.postMessage(
        {
            pluginMessage: {
                type: SAVE_COLOR_SCHEME,
                data: {scheme},
            },
        },
        '*'
    );
};
