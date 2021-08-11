import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import VisLineChart from './VisLineChart';
import VisPieChart from './VisPieChart';

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
                width: '100%',
                backgroundColor: '#f2f2f2',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {chart}
            </div>
        </div>
    );
}
