import {Empty} from 'antd';
import {useAtom} from 'jotai';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {appAtom} from '../../atoms/appAtom';
import BarDataTable from './DataTable/BarDataTable';
import CalendarDataTable from './DataTable/CalendarDataTable';
import LineDataTable from './DataTable/LineDataTable';
import PieDataTable from './DataTable/PieDataTable';
import ScatterDataTable from './DataTable/ScatterDataTable';

export default function DataTable() {
    const [app] = useAtom(appAtom);
    const {t} = useTranslation();

    const createTable = React.useCallback(() => {
        const activeChart = app.charts.find((chart) => chart.id === app.activeKey);

        if (activeChart) {
            switch (activeChart.type) {
                case 'line':
                    return <LineDataTable id={activeChart.id} />;
                case 'bar':
                    return <BarDataTable id={activeChart.id} />;
                case 'pie':
                    return <PieDataTable id={activeChart.id} />;
                case 'scatter':
                    return <ScatterDataTable id={activeChart.id} />;
                case 'calendar':
                    return <CalendarDataTable id={activeChart.id} />;
                default:
                    return null;
            }
        } else {
            return <Empty description={t('Select a chart to view its data')} />;
        }
    }, [app]);

    return createTable();
}
