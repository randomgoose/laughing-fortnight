import {IExample} from '..';
import {LineState} from '../../atoms/lineAtomFamily';

export const steppedLines: IExample<Partial<LineState>> = {
    name: 'stepped-lines',
    id: 'stepped-lines',
    state: {
        showLegend: false,
        width: 400,
        height: 300,
        x: 100,
        y: 100,
        enableArea: true,
        scale: 1,
        curve: 'stepAfter',
        enablePoints: false,
    },
};
