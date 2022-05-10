import cryptoRandomString from 'crypto-random-string';
import {useImmerAtom} from 'jotai/immer';
import {radarAtomFamily, RadarState} from '../atoms/radarAtomFamily';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {colorSchemes, ColorSchemeId} from '@nivo/colors';
import {useApp} from './useApp';

export default function useRadar(id: string) {
    const [radar, setRadar] = useImmerAtom(radarAtomFamily({id}));
    const {app} = useApp();

    useDeepCompareEffect(() => {
        if (radar.colorSchemeId in colorSchemes) {
            setRadar((state) => {
                state.colors = {scheme: radar.colorSchemeId as ColorSchemeId};
            });
        } else {
            setRadar((state) => {
                const colorScheme = app.colorSchemes.find((item) => item.id === radar.colorSchemeId);
                if (colorScheme) {
                    state.colors = colorScheme.colors;
                }
            });
        }
    }, [radar.colorSchemeId, app.colorSchemes]);

    function setPartialState(state: Partial<RadarState>) {
        setRadar((draftState) => Object.assign(draftState, state));
    }

    function addAttribute() {
        setRadar((draftState) => {
            const attribute = cryptoRandomString({length: 4});
            draftState.data.push({...draftState.data[0], [radar['indexBy'].toString()]: attribute});
        });
    }

    function changeDataByIndex(index: string, serie: string, value: number) {
        setRadar((radar) => {
            radar.data.find((datum) => datum[radar.indexBy.toString()] === index)[serie] = value;
        });
    }

    function addSerie() {
        setRadar((draftState) => {
            const serie = cryptoRandomString({length: 4});
            draftState.keys.push(serie);
            draftState.data.map((datum) => {
                datum[serie] = 100;
            });
        });
    }

    function removeAttribute(id: string) {
        setRadar((draftState) => {
            draftState.data = draftState.data.filter((datum) => datum[radar['indexBy'].toString()] !== id);
        });
    }

    return {
        radar,
        setRadar,
        setPartialState,
        changeDataByIndex,
        addAttribute,
        addSerie,
        removeAttribute,
    };
}
