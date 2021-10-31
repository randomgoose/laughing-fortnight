import {Serie} from '@nivo/line';
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
    };
}
