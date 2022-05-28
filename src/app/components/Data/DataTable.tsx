import {Empty} from 'antd';
import {atom, PrimitiveAtom, useAtom} from 'jotai';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {appAtom} from '../../atoms/appAtom';
import {BarState} from '../../atoms/barAtomFamily';
import {chartAtomsAtom} from '../../atoms/history';
import {selectedChartAtom} from '../../atoms/selection';
import BarDataTable from './DataTable/BarDataTable';
import CalendarDataTable from './DataTable/CalendarDataTable';
import LineDataTable from './DataTable/LineDataTable';
import PieDataTable from './DataTable/PieDataTable';
import RadarDataTable from './DataTable/RadarDataTable';
import ScatterDataTable from './DataTable/ScatterDataTable';

const activeKeyAtom = atom((get) => {
    const atom = get(selectedChartAtom);
    if (atom) {
        return get(atom).key;
    } else {
        return null;
    }
});

const fancyAtom = atom((get) => get(chartAtomsAtom).find((chart) => get(chart).key.toString() === get(activeKeyAtom)));

export default function DataTable() {
    const [app] = useAtom(appAtom);
    const {t} = useTranslation();
    const [activeKey] = useAtom(activeKeyAtom);
    const [at] = useAtom(fancyAtom);

    const createTable = () => {
        const activeChart = app.charts.find((chart) => chart.id === app.activeKey);

        if (activeChart && activeKey && at) {
            switch (activeChart.type) {
                case 'LINE':
                    return <LineDataTable id={activeChart.id} />;
                case 'BAR':
                    return <BarDataTable id={activeKey} atom={at as PrimitiveAtom<BarState>} />;
                case 'PIE':
                    return <PieDataTable id={activeChart.id} />;
                case 'SCATTER':
                    return <ScatterDataTable id={activeChart.id} />;
                case 'CALENDAR':
                    return <CalendarDataTable id={activeChart.id} />;
                case 'RADAR':
                    return <RadarDataTable id={activeChart.id} />;
                default:
                    return null;
            }
        } else {
            return <Empty description={t('Select a chart to view its data')} />;
        }
    };

    return createTable();
}
