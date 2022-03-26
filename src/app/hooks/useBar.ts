import {PrimitiveAtom} from 'jotai';
import {useImmerAtom} from 'jotai/immer';
import {barAtomFamily, BarState} from '../atoms/barAtomFamily';
import _ from 'lodash';
import cryptoRandomString from 'crypto-random-string';
import {colorSchemes, ColorSchemeId} from '@nivo/colors';
import {useApp} from './useApp';
import useDeepCompareEffect from 'use-deep-compare-effect';

export function useBar(id: string) {
    const [bar, setBar] = useImmerAtom(barAtomFamily({id}) as PrimitiveAtom<BarState>);
    const {app} = useApp();

    useDeepCompareEffect(() => {
        console.log(app.colorSchemes);
        console.log(bar.colorSchemeId);
        if (bar.colorSchemeId in colorSchemes) {
            setBar((state) => {
                state.colors = {scheme: bar.colorSchemeId as ColorSchemeId};
            });
        } else {
            setBar((state) => {
                const colorScheme = app.colorSchemes.find((item) => item.id === bar.colorSchemeId);
                if (colorScheme) {
                    state.colors = colorScheme.colors;
                }
            });
        }
    }, [bar.colorSchemeId, app.colorSchemes]);

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
            draftState.data.map((datum) => (datum[key] = (Math.random() * 100).toFixed(0)));
            draftState.keys.push(key);
        });
    }

    function setPartialState(state: Partial<BarState>) {
        setBar((draftState) => Object.assign(draftState, state));
    }

    function setColorScheme({scheme}: {scheme: string | ColorSchemeId}) {
        console.log(scheme);
        if (scheme in colorSchemes) {
            console.log('use nivo colors');
            setBar((state) => {
                state.colors = {scheme: scheme as ColorSchemeId};
            });
        } else {
            const localScheme = app.colorSchemes.find((item) => item.id === scheme);
            if (localScheme) {
                setBar((state) => {
                    state.colors = localScheme.colors;
                });
            }
        }
    }

    function addRow() {
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
        setColorScheme,
    };
}
