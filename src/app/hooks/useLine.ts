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

    return {
        line,
        setSerieValue,
        setSerieId,
        setPartialState,
    };
}
