import {atom, PrimitiveAtom, SetStateAction} from 'jotai';
import {BarState} from './barAtomFamily';

export type ChartAtom = PrimitiveAtom<BarState>;

const internalChartsAtom = atom<ChartAtom[]>([]);

const historyAtom = atom<BarState[][]>([]);

export const saveHisotryAtom = atom(null, (get, set, _update) => {
    const charts = get(internalChartsAtom).map((chartAtom) => get(chartAtom));
    set(historyAtom, (prev) => [charts, ...prev]);
});

export const chartsAtom = atom(
    (get) => get(internalChartsAtom),
    (_get, set, update: SetStateAction<ChartAtom[]>) => {
        set(saveHisotryAtom, null);
        set(internalChartsAtom, update);
    }
);

export const undoAtom = atom(
    (get) => {
        const hasHistory = get(historyAtom).length > 0;
        return hasHistory;
    },
    (get, set, _update) => {
        const history = get(historyAtom);
        if (history.length > 0) {
            const [charts, ...rest] = history;
            set(internalChartsAtom, (prev) =>
                charts.map((chart, index) => (get(prev[index]) === chart ? prev[index] : atom(chart)))
            );
            set(historyAtom, rest);
        }
    }
);
