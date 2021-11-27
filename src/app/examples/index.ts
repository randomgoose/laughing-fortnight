import {lineExamples} from './line-examples';
import {pieExamples} from './pie-examples';
export interface IExample<T> {
    name: string;
    id: string;
    state: T;
}

export const examples = {
    pie: pieExamples,
    line: lineExamples,
};
