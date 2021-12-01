import {IExample} from '..';
import {BarState} from '../../atoms/barAtomFamily';

export const stackedBars: IExample<Partial<BarState>> = {
    name: 'stacked-bars',
    id: 'stacked-bars',
    state: {
        groupMode: 'stacked',
    },
};
