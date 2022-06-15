import {PrimitiveAtom, useAtom} from 'jotai';
import * as React from 'react';
import {ChartType} from '../../../types';
import {BarState} from '../../atoms/barAtomFamily';
import {ChartAtom} from '../../atoms/history';
import {LineState} from '../../atoms/lineAtomFamily';
import {PieState} from '../../atoms/pieAtomFamily';
import BarConfig from './BarConfig';
import CalendarConfig from './CalendarConfig';
import LineConfig from './LineConfig';
import PieConfig from './PieConfig';
import RadarConfig from './RadarConfig';
import ScatterConfig from './ScatterConfig';

export default function Config({atom}: {atom: ChartAtom}) {
    const [{type}] = useAtom(atom);

    const renderConfig = (type: ChartType) => {
        switch (type) {
            case 'PIE':
                return <PieConfig atom={atom as PrimitiveAtom<PieState>} />;
            case 'LINE':
                return <LineConfig atom={atom as PrimitiveAtom<LineState>} />;
            case 'BAR':
                return <BarConfig atom={atom as PrimitiveAtom<BarState>} />;
            case 'SCATTER':
                return <ScatterConfig />;
            case 'CALENDAR':
                return <CalendarConfig />;
            case 'RADAR':
                return <RadarConfig />;
            default:
                return null;
        }
    };

    return renderConfig(type);
}
