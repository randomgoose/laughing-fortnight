import {useImmerAtom} from 'jotai/immer';
import {scatterAtomFamily, ScatterState} from '../atoms/scatterAtomFamily';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {colorSchemes, ColorSchemeId} from '@nivo/colors';
import {useApp} from './useApp';

export function useScatter(id: string) {
    const [scatter, setScatter] = useImmerAtom(scatterAtomFamily({id}));
    const {app} = useApp();

    useDeepCompareEffect(() => {
        if (scatter.colorSchemeId in colorSchemes) {
            setScatter((state) => {
                state.colors = {scheme: scatter.colorSchemeId as ColorSchemeId};
            });
        } else {
            setScatter((state) => {
                const colorScheme = app.colorSchemes.find((item) => item.id === scatter.colorSchemeId);
                if (colorScheme) {
                    state.colors = colorScheme.colors;
                }
            });
        }
    }, [scatter.colorSchemeId, app.colorSchemes]);

    function setPartialState(state: Partial<ScatterState>) {
        setScatter((draftState) => Object.assign(draftState, state));
    }

    function changeNodeDataX(serieId: number | string, index: number, value: number) {
        setScatter((draftState) => {
            draftState.data.find((datum) => datum.id === serieId).data[index].x = value;
        });
    }

    function changeNodeDataY(serieId: number | string, index: number, value: number) {
        setScatter((draftState) => {
            draftState.data.find((datum) => datum.id === serieId).data[index].y = value;
        });
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

    // function changeNodeGroup(originGroupId: string, index: number, targetGroupId: string) {
    //     setScatter((draftState) => {
    //         const originGroup = scatter.data.find(group => group.id === originGroupId)
    //         const targetGroup = scatter.data.find(group => group.id === targetGroupId)

    //         if (originGroup && targetGroup) {
    //             const node = originGroup.data[index]
    //             draftState.data.find(group => group.id === targetGroupId).data.push(node)
    //             draftState.data.find(group => group.id === originGroupId).data.splice(index, 1)
    //         }
    //     })
    // }

    return {
        scatter,
        setPartialState,
        addPoint,
        changeGroupName,
        setNewData,
        removeGroup,
        changeNodeDataX,
        changeNodeDataY,
    };
}
