import {Datum, Serie} from '@nivo/line';
import cryptoRandomString from 'crypto-random-string';
import {generateNumberSequence} from '../utils/generateNumbers';

export type Trend = 'rise' | 'fall';

export interface MockDataProps {
    min: number;
    max: number;
    length: number;
    count: number;
    trend: Trend;
    decimalDigit: number;
}

export const mockLineData = (numberSequenceAttr: MockDataProps): Serie[] => {
    const {count} = numberSequenceAttr;
    let series: Serie[] = [];

    for (let i = 0; i < count; i++) {
        const serie: Serie = {
            id: cryptoRandomString({length: 4}),
            data: generateNumberSequence(numberSequenceAttr) as Datum[],
        };
        series.push(serie);
    }

    return series;
};
