import {Serie} from '@nivo/line';
import cryptoRandomString from 'crypto-random-string';
import {PrimitiveAtom} from 'jotai';
import {useImmerAtom} from 'jotai/immer';
import {lineAtomFamily, LineState} from '../atoms/lineAtomFamily';

export function useLine(id: string) {
    const [line, setLine] = useImmerAtom(lineAtomFamily({id}) as PrimitiveAtom<LineState>);

    function setSerieValue(serieIndex, datumIndex, key, value) {
        setLine((draftState) => {
            draftState.data[serieIndex]['data'][datumIndex][key] = value;
        });
    }

    function setSerieId(id: string, newId: string) {
        setLine((draftState) => {
            draftState.data.find((serie) => serie.id === id).id = newId;
            draftState.lines = draftState.lines.filter((i) => i !== id);
            draftState.lines.push(newId);
        });
    }

    function updateTick(tick: string, newTick: string) {
        setLine((draftState) => {
            draftState.data.map((i) => (i.data.find((datum) => datum.x === tick).x = newTick));
        });
    }

    function addSerie() {
        const id = cryptoRandomString({length: 4});
        setLine((draftState) => {
            draftState.data.push({...draftState.data[0], id});
            draftState.lines.push(id);
        });
    }

    function removeSerieById(id: string) {
        setLine((draftState) => {
            draftState.data = draftState.data.filter((serie) => serie.id !== id);
        });
    }

    function setPartialState(state: Partial<LineState>) {
        setLine((drafState) => Object.assign(drafState, state));
    }

    function setNewData(data: Serie[]) {
        setLine((draftState) => {
            draftState.data = data;
            draftState.lines = data
                .filter((serie) => serie.data.filter((datum) => isNaN(parseFloat(datum.y as string))).length === 0)
                .map((serie) => serie.id);
        });
    }

    return {
        line,
        setSerieValue,
        setSerieId,
        setPartialState,
        setNewData,
        removeSerieById,
        addSerie,
        updateTick,
    };
}
