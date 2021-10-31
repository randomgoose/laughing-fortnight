import {useAtom} from 'jotai';
import {appAtom} from '../atoms/appAtom';

export function useApp() {
    const [app] = useAtom(appAtom);

    function getCurrentChart() {
        const chart = app.charts.find((chart) => chart.id === app.activeKey);
        return chart;
    }

    return {
        app,
        getCurrentChart,
    };
}
