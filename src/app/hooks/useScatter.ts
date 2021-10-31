import {useImmerAtom} from 'jotai/immer';
import {scatterAtomFamily, ScatterState} from '../atoms/scatterAtomFamily';

export function useScatter(id: string) {
    const [scatter, setScatter] = useImmerAtom(scatterAtomFamily({id}));

    function setPartialState(state: Partial<ScatterState>) {
        setScatter((draftState) => Object.assign(draftState, state));
    }

    function addPoint(group: string, x: number, y: number) {
        const existingGroup = scatter.data.find((datum) => datum.id === group);
        if (existingGroup) {
            setScatter((draftState) => {
                draftState.data.find((datum) => datum.id === group).data.push({x, y});
            });
        }
    }

    return {
        scatter,
        setPartialState,
        addPoint,
    };
}
