import {atom, PrimitiveAtom} from 'jotai';
import {SAVE_COLOR_SCHEMES} from '../../plugin/message-types';
import {IColorScheme} from '../../types';

export type ColorSchemeAtom = PrimitiveAtom<IColorScheme>;

export const colorSchemeAtoms = atom<ColorSchemeAtom[]>([]);

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
                type: SAVE_COLOR_SCHEMES,
                data: {scheme},
            },
        },
        '*'
    );
};
