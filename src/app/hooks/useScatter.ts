import {useImmerAtom} from 'jotai/immer';
import {scatterAtomFamily, ScatterState} from '../atoms/scatterAtomFamily';

export function useScatter(id: string) {
    const [scatter, setScatter] = useImmerAtom(scatterAtomFamily({id}));

    function setPartialState(state: Partial<ScatterState>) {
        setScatter((draftState) => Object.assign(draftState, state));
    }

    return {
        scatter,
        setPartialState,
    };
}
