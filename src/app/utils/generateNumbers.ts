import NormalDistribution from 'normal-distribution';
import {BarDatum} from '@nivo/bar';
import cryptoRandomString from 'crypto-random-string';

export type Trend = 'rise' | 'fall';

export const generateIncreasingNumberSequence = (
    length: number,
    max: number = 100,
    min: number = 1,
    decimalDigit: number = 2
): number[] => {
    let res = [];
    for (let i = 0; i < length; i++) {
        res.push((Math.random() * (max - min) + min).toFixed(decimalDigit));
    }
    return res.sort((a, b) => a - b);
};

export const generateDecreasingNumberSequence = (
    length: number,
    max: number = 100,
    min: number = 1,
    decimalDigit: number = 2
): number[] => {
    let res = [];
    for (let i = 0; i < length; i++) {
        res.push((Math.random() * (max - min) + min).toFixed(decimalDigit));
    }
    return res.sort((a, b) => b - a);
};

export const generateGaussianSequence = (count: number, mean: number, std: number) => {
    const normDist = new NormalDistribution(mean, std);
    let res = [];
    for (let i = 0; i < count; i++) {
        res.push(normDist.cdf(Math.random()));
    }
    return res;
};

export const generateNumberSequence = ({
    length,
    max,
    min,
    trend,
    decimalDigit,
}: {
    length: number;
    max: number;
    min: number;
    trend: Trend;
    decimalDigit: number;
}) => {
    if (trend === 'rise') {
        return generateIncreasingNumberSequence(length, max, min, decimalDigit).map((num, index) => {
            return {x: index, y: num};
        });
    } else if (trend === 'fall') {
        return generateDecreasingNumberSequence(length, max, min, decimalDigit).map((num, index) => {
            return {x: index, y: num};
        });
    }
};

export const generateDatum = ({
    attrs,
    min,
    max,
    decimalDigit = 2,
}: {
    attrs: string[];
    min: number;
    max: number;
    decimalDigit: number;
}): BarDatum => {
    let datum = {};
    attrs.forEach((attr) => {
        datum[attr] = (Math.random() * (max - min) + min).toFixed(decimalDigit);
        datum['id'] = cryptoRandomString({length: 4});
    });
    return datum;
};

export const generateDatumSequence = ({
    attrs,
    length,
    min,
    max,
    decimalDigit,
}: {
    attrs: string[];
    length: number;
    min: number;
    max: number;
    decimalDigit: number;
}): BarDatum[] => {
    let res = [];
    for (let i = 0; i < length; i++) {
        res.push(generateDatum({attrs, min, max, decimalDigit}));
    }
    return res;
};
