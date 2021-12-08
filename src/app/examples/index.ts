import {barExamples} from './bar-examples';
import {lineExamples} from './line-examples';
import {pieExamples} from './pie-examples';
import {radarExamples} from './radar-examples';
export interface IExample<T> {
    name: string;
    id: string;
    state: T;
}

export const examples = {
    pie: pieExamples,
    line: lineExamples,
    bar: barExamples,
    radar: radarExamples,
};
