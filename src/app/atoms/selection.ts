import {atom} from 'jotai';
import {ChartAtom} from './history';

const activeChartAtomAtom = atom<ChartAtom | null>(null);

export const selectAtom = atom(null, (_get, set, update: ChartAtom) => {
    set(activeChartAtomAtom, update);
});
