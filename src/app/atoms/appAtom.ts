import {atom} from 'jotai';
import {IColorScheme} from '../../types';

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
