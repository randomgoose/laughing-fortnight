import {atom} from 'jotai';
import {ChartAtom, chartAtomsAtom, saveHisotryAtom} from './history';

export const selectedChartAtom = atom<ChartAtom | null>(null);

export const selectedAtomCreator = (chartAtom: ChartAtom) => {
    return atom((get) => chartAtom === get(selectedChartAtom));
};

export const unselectChartAtom = atom(null, (_get, set, _update) => {
    set(selectedChartAtom, null);
});

export const selectChartAtom = atom(null, (get, set, update: ChartAtom) => {
    console.log(`Select ${get(update).key}`);
    set(selectedChartAtom, update);
});

export const selectedAtom = atom((get) => get(selectedChartAtom));

export const selectedAtomKeyAtom = atom((get) => {
    const selected = get(selectedChartAtom);
    if (selected) {
        return get(selected).key;
    } else return null;
});

export const deleteSelectedChart = atom(
    (get) => {
        return !!get(selectedAtom);
    },
    (get, set, _update) => {
        const selected = get(selectedAtom);
        if (selected) {
            console.log('add to history', selected);
            set(saveHisotryAtom, null);
            set(chartAtomsAtom, (prev) => prev.filter((item) => item !== selected));
            set(unselectChartAtom, null);
        }
    }
);
