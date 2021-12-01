import {IExample} from '..';
import {LineState} from '../../atoms/lineAtomFamily';

export const area: IExample<Partial<LineState>> = {
    name: 'area',
    id: 'area',
    state: {
        showLegend: false,
        width: 400,
        height: 300,
        x: 100,
        y: 100,
        enableArea: true,
        scale: 1,
        curve: 'natural',
        enablePoints: false,
    },
};
