import {PrimitiveAtom} from 'jotai';
import {useImmerAtom} from 'jotai/immer';
import {barAtomFamily, BarState} from '../atoms/barAtomFamily';
import _ from 'lodash';

export function useBar(id: string) {
    const [bar, setBar] = useImmerAtom(barAtomFamily({id}) as PrimitiveAtom<BarState>);

    function setData(index: number, key: string, value: number) {
        setBar((draftState) => {
            draftState.data[index][key] = value;
        });
    }

    function setKey(key: string, newKey: string) {
        setBar((draftState) => {
            draftState.data.map((datum) => {
                datum[newKey] = datum[key];
                datum = _.omit(datum, [key]);
            });
            draftState.keys.splice(draftState.keys.indexOf(key), 1, newKey);
        });
    }

    function removeKey(key: string) {
        setBar((draftState) => {
            draftState.data.map((datum) => {
                datum = _.omit(datum, [key]);
            });
            draftState.keys = draftState.keys.filter((k) => k !== key);
        });
    }

    function addKey(key: string) {
        setBar((draftState) => {
            draftState.data.map((datum) => (datum[key] = Math.random()));
            draftState.keys.push(key);
        });
    }

    function setPartialState(state: Partial<BarState>) {
        setBar((draftState) => Object.assign(draftState, state));
    }

    return {
        bar,
        setData,
        setKey,
        removeKey,
        addKey,
        setPartialState,
    };
}
