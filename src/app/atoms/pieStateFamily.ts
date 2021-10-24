import {DefaultRawDatum, PieSvgProps} from '@nivo/pie';
import {atomFamily} from 'recoil';
import {data} from '../data/basePieData';

export interface PieState extends PieSvgProps<DefaultRawDatum> {
    data: DefaultRawDatum[];
    x: number;
    y: number;
    scale: number;
}

export const pieStateFamily = atomFamily<PieState, any>({
    key: 'PieState',
    default: {
        data: data,
        scale: 1,
        width: 400,
        height: 300,
        x: 400,
        y: 100,
    },
});
