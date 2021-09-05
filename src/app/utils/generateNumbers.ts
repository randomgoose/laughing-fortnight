import NormalDistribution from 'normal-distribution';
import {BarDatum} from '@nivo/bar';

export type Trend = 'rise' | 'fall';

export const generateIncreasingNumberSequence = (count: number, max: number = 100, min: number = 1): number[] => {
    let res = [];
    for (let i = 0; i < count; i++) {
        res.push((Math.random() * (max - min) + min).toFixed(2));
    }
    return res.sort((a, b) => a - b);
};

export const generateDecreasingNumberSequence = (count: number, max: number = 100, min: number = 1): number[] => {
    let res = [];
    for (let i = 0; i < count; i++) {
        res.push((Math.random() * (max - min) + min).toFixed(2));
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
    count,
    max,
    min,
    trend,
}: {
    count: number;
    max: number;
    min: number;
    trend: Trend;
}) => {
    if (trend === 'rise') {
        return generateIncreasingNumberSequence(count, max, min).map((num, index) => {
            return {x: index, y: num};
        });
    } else if (trend === 'fall') {
        return generateDecreasingNumberSequence(count, max, min).map((num, index) => {
            return {x: index, y: num};
        });
    }
};

export const generateDatum = ({attrs, min, max}: {attrs: string[]; min: number; max: number}): BarDatum => {
    let datum = {};
    attrs.forEach((attr) => {
        datum[attr] = (Math.random() * (max - min) + min).toFixed(2);
    });
    return datum;
};

export const generateDatumSequence = ({
    attrs,
    length,
    min,
    max,
}: {
    attrs: string[];
    length: number;
    min: number;
    max: number;
}): BarDatum[] => {
    let res = [];
    for (let i = 0; i < length; i++) {
        res.push(generateDatum({attrs, min, max}));
    }
    return res;
};
