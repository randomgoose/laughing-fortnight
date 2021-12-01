import {IExample} from '..';
import {LineState} from '../../atoms/lineAtomFamily';

export const sparkline: IExample<Partial<LineState>> = {
    name: 'sparkline',
    id: 'sparkline',
    state: {
        showLegend: false,
        width: 400,
        height: 300,
        x: 100,
        y: 100,
        enableArea: false,
        scale: 1,
        showXAxis: false,
        showYAxis: false,
        axisBottom: null,
        axisLeft: null,
        enableGridX: false,
        enableGridY: false,
        legends: [],
        margin: {top: 40, right: 40, left: 40, bottom: 40},
        curve: 'natural',
        enablePoints: false,
    },
};
