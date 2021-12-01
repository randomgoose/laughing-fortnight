import {IExample} from '..';
import {PieState} from '../../atoms/pieAtomFamily';

export const donut: IExample<Partial<PieState>> = {
    name: 'donut',
    id: 'donut',
    state: {
        x: 100,
        y: 100,
        width: 400,
        height: 300,
        innerRadius: 0.8,
        legends: [],
        margin: {left: 40, top: 40, right: 40, bottom: 40},
    },
};
