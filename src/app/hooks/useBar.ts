import {useAtom} from 'jotai';
import {useImmerAtom} from 'jotai/immer';
import {barAtomFamily, BarState} from '../atoms/barAtomFamily';
import * as _ from 'lodash';
import cryptoRandomString from 'crypto-random-string';
import {saveHisotryAtom} from '../atoms/history';

export function useBar(id: string) {
    const [bar, setBar] = useImmerAtom(barAtomFamily({id}));
    const [, save] = useAtom(saveHisotryAtom);

    function setData(index: number, key: string, value: number) {
        save(null);
        setBar((draftState) => {
            draftState.data[index][key] = value;
        });
    }

    function setKey(key: string, newKey: string) {
        save(null);
        setBar((draftState) => {
            draftState.data.map((datum) => {
                datum[newKey] = datum[key];
                datum = _.omit(datum, [key]);
            });
            draftState.keys?.splice(draftState.keys.indexOf(key), 1, newKey);
        });
    }

    function removeKey(key: string) {
        save(null);
        setBar((draftState) => {
            draftState.data.map((datum) => {
                datum = _.omit(datum, [key]);
            });
            draftState.keys = draftState.keys?.filter((k) => k !== key);
        });
    }

    function addKey(key: string) {
        save(null);
        setBar((draftState) => {
            draftState.data.map((datum) => (datum[key] = (Math.random() * 100).toFixed(0)));
            draftState.keys?.push(key);
        });
    }

    function setPartialState(state: Partial<BarState>) {
        save(null);
        setBar((draftState) => Object.assign(draftState, state));
    }

    function addRow() {
        save(null);
        setBar((draftState) => {
            draftState.data.push({...draftState.data[0], id: cryptoRandomString({length: 4})});
        });
    }

    return {
        bar,
        setBar,
        setData,
        setKey,
        removeKey,
        addKey,
        setPartialState,
        addRow,
    };
}
