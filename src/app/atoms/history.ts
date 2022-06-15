import {atom, PrimitiveAtom, SetStateAction} from 'jotai';
import {ChartState} from '../../types';
import {selectChartAtom} from './selection';

export type ChartAtom = PrimitiveAtom<ChartState>;

const internalChartAtomsAtom = atom<ChartAtom[]>([]);

const historyAtom = atom<ChartState[][]>([]);
// const futureAtom = atom<(BarState | LineState)[][]>([]);

export const saveHisotryAtom = atom(null, (get, set, _update) => {
    const charts = get(internalChartAtomsAtom).map((chartAtom) => get(chartAtom));
    set(historyAtom, (prev) => [charts, ...prev]);
});

export const chartAtomsAtom = atom(
    (get) => get(internalChartAtomsAtom),
    (_get, set, update: SetStateAction<ChartAtom[]>) => {
        set(saveHisotryAtom, null);
        set(internalChartAtomsAtom, update);
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

            set(internalChartAtomsAtom, (prev) => {
                return charts.map((chart, index) => {
                    return prev.length > 0 && get(prev[index]) === chart ? prev[index] : atom(chart);
                });
            });

            set(selectChartAtom, get(internalChartAtomsAtom)[0]);

            set(historyAtom, rest);
        }
    }
);
