import cryptoRandomString from 'crypto-random-string';
import {useImmerAtom} from 'jotai/immer';
import {radarAtomFamily, RadarState} from '../atoms/radarAtomFamily';

export default function useRadar(id: string) {
    const [radar, setRadar] = useImmerAtom(radarAtomFamily({id}));

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
