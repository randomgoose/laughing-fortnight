import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import BarDataTable from './DataTable/BarDataTable';
import LineDataTable from './DataTable/LineDataTable';
import PieDataTable from './DataTable/PieDataTable';

export default function DataTable() {
    const {chartType} = useSelector((state: RootState) => state.app);

    const createTable = React.useCallback(() => {
        if (chartType === 'line') return <LineDataTable />;
        if (chartType === 'bar') return <BarDataTable />;
        if (chartType === 'pie') return <PieDataTable id={'pie'} />;
    }, [chartType]);

    return createTable();
}
