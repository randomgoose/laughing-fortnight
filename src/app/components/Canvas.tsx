import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import VisLineChart from './Chart/VisLineChart';
import VisPieChart from './Chart/VisPieChart';

export default function Canvas() {
    const {chartType} = useSelector((state: RootState) => state.app);

    let chart = <VisLineChart />;

    switch (chartType) {
        case 'line':
            chart = <VisLineChart />;
            break;
        case 'pie':
            chart = <VisPieChart />;
            break;
        default:
            chart = <VisLineChart />;
    }

    return (
        <div
            style={{
                height: '50%',
                flex: 1,
                backgroundColor: '#f2f2f2',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div style={{resize: 'both', width: '100%', height: '100%', overflow: 'scroll'}}>{chart}</div>
        </div>
    );
}
