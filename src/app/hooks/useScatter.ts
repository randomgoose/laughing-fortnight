import {useImmerAtom} from 'jotai/immer';
import {scatterAtomFamily, ScatterState} from '../atoms/scatterAtomFamily';

export function useScatter(id: string) {
    const [scatter, setScatter] = useImmerAtom(scatterAtomFamily({id}));

    function setPartialState(state: Partial<ScatterState>) {
        setScatter((draftState) => Object.assign(draftState, state));
    }

    function removeGroup(group: string) {
        setScatter((draftState) => {
            draftState.data = draftState.data.filter((datum) => datum.id !== group);
        });
    }

    function addPoint(group: string, x: number, y: number) {
        const existingGroup = scatter.data.find((datum) => datum.id === group);
        if (existingGroup) {
            setScatter((draftState) => {
                draftState.data.find((datum) => datum.id === group).data.push({x, y});
            });
        }
    }

    function changeGroupName(group: string, newGroup: string) {
        setScatter((draftState) => {
            draftState.data.find((datum) => datum.id === group).id = newGroup;
        });
    }

    function setNewData(newData) {
        setScatter((draftState) => {
            draftState.data = newData;
        });
    }

    return {
        scatter,
        setPartialState,
        addPoint,
        changeGroupName,
        setNewData,
        removeGroup,
    };
}
