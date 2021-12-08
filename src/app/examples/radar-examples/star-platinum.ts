import {IExample} from '..';
import {RadarState} from '../../atoms/radarAtomFamily';

export const starPlatinum: IExample<Partial<RadarState>> = {
    name: 'star-platinum',
    id: 'star-platinum',
    state: {
        indexBy: 'attribute',
        keys: ['starPlatinum'],
        gridShape: 'linear',
        maxValue: 6,
        data: [
            {attribute: 'Power', starPlatinum: 5},
            {attribute: 'Speed', starPlatinum: 5},
            {attribute: 'Range', starPlatinum: 3},
            {attribute: 'Durability', starPlatinum: 5},
            {attribute: 'Precision', starPlatinum: 5},
            {attribute: 'Growth Potential', starPlatinum: 5},
        ],
        margin: {
            top: 40,
            left: 40,
            right: 40,
            bottom: 40,
        },
    },
};
