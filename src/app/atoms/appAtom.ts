import {atom} from 'jotai';
import {IColorScheme} from '../../types';
import {barAtomFamily} from './barAtomFamily';
import {chartsAtom} from './history';

export type ChartType = 'line' | 'pie' | 'bar' | 'scatter' | 'radar' | 'calendar';
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

export const addChartAtom = atom(null, (_get, set, update: string) => {
    const chartAtom = barAtomFamily({id: update});
    set(chartsAtom, (prev) => [...prev, chartAtom]);
});

export const insertChartAtom = atom(null, (_get, set, update: Chart) => {
    set(appAtom, (prev) => ({...prev, charts: [...prev.charts, update], activeKey: update.id}));
});
