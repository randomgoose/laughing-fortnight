import {atom, PrimitiveAtom} from 'jotai';
import {IColorScheme} from '../../types';
import {barAtomFamily, BarState} from './barAtomFamily';
import {ChartAtom, chartAtomsAtom, saveHisotryAtom} from './history';
import {lineAtomFamily, LineState} from './lineAtomFamily';
import {selectChartAtom} from './selection';

export type ChartType = 'LINE' | 'PIE' | 'BAR' | 'SCATTER' | 'RADAR' | 'CALENDAR';
export type WindowSize = 'sm' | 'md' | 'lg';
export type Param = {id: string};

export interface Chart {
    id: string;
    type: ChartType;
    initialState?: any;
}

export interface AppState {
    activeKey: string;
    charts: Chart[];
    dataSource: 'mock' | 'file' | 'sheet' | null;
    selectionId: string;
    showAdvancedConfig: boolean;
    rndEnabled: boolean;
    hideInterface: boolean;
    scale: number;
    decimalDigit: number;
    windowSize: WindowSize;
    colorSchemes: IColorScheme[];
    activeColorSchemeId: IColorScheme['id'];
}

export const appAtom = atom<AppState>({
    activeKey: '',
    charts: [],
    dataSource: null,
    selectionId: '',
    showAdvancedConfig: false,
    rndEnabled: false,
    hideInterface: false,
    scale: 1,
    decimalDigit: 2,
    windowSize: 'sm',
    colorSchemes: [],
    activeColorSchemeId: '',
});

export const numberOfChartsAtom = atom((get) => get(appAtom).charts.length);

export const chartAtomCreator = (type: ChartType, id: string) => {
    switch (type) {
        case 'BAR':
            return barAtomFamily({id});
        case 'LINE':
            return lineAtomFamily({id});
        default:
            return lineAtomFamily({id});
    }
};

export const addChartAtom = atom(null, (_get, set, update: {type: ChartType; id: string}) => {
    const {type, id} = update;

    const chartAtom = chartAtomCreator(type, id);
    set(saveHisotryAtom, null);
    // TODO: FIX TYPE ISSUE
    set(chartAtomsAtom, (prev) => [...prev, chartAtom as PrimitiveAtom<BarState | LineState>]);
    set(selectChartAtom, chartAtom as ChartAtom);
});

export const insertChartAtom = atom(null, (_get, set, update: Chart) => {
    set(appAtom, (prev) => ({...prev, charts: [...prev.charts, update], activeKey: update.id}));
});
