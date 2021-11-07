import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';
import {Param} from './appAtom';

export interface ColorScheme {
    name: string;
    id: string;
    colors: string[];
}

export const colorSchemeFamily = atomFamily(
    (param: Param) =>
        atom({
            key: param.id,
        }),
    (a: Param, b: Param) => a.id === b.id
);
