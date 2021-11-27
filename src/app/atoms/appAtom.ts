import {atom} from 'jotai';

export type ChartType = 'line' | 'pie' | 'bar' | 'scatter' | 'radar';
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
});
