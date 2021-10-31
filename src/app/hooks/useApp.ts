import {useImmerAtom} from 'jotai/immer';
import {appAtom, AppState} from '../atoms/appAtom';

export function useApp() {
    const [app, setApp] = useImmerAtom(appAtom);

    function getCurrentChart() {
        const chart = app.charts.find((chart) => chart.id === app.activeKey);
        return chart;
    }

    function setPartialState(state: Partial<AppState>) {
        setApp((app) => Object.assign(app, state));
    }

    return {
        app,
        getCurrentChart,
        setPartialState,
    };
}
