import {DefaultRawDatum} from '@nivo/pie';
import cryptoRandomString from 'crypto-random-string';
import {useImmerAtom} from 'jotai/immer';
import {pieAtomFamily} from '../atoms/pieAtomFamily';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {useApp} from './useApp';
import {colorSchemes, ColorSchemeId} from '@nivo/colors';

export function usePie(id: string) {
    const [pie, setPie] = useImmerAtom(pieAtomFamily({id}));
    const {app} = useApp();

    useDeepCompareEffect(() => {
        if (pie.colorSchemeId in colorSchemes) {
            setPie((state) => {
                state.colors = {scheme: pie.colorSchemeId as ColorSchemeId};
            });
        } else {
            setPie((state) => {
                const colorScheme = app.colorSchemes.find((item) => item.id === pie.colorSchemeId);
                if (colorScheme) {
                    state.colors = colorScheme.colors;
                }
            });
        }
    }, [pie.colorSchemeId, app.colorSchemes]);

    function addArc(): string {
        const id = cryptoRandomString({length: 4});
        setPie((pie) => {
            pie.data.push({value: 100, label: id, id: id});
        });

        return id;
    }

    function removeArcById(arcId: string) {
        setPie((pie) => {
            pie.data = pie.data.filter((datum) => datum.id !== arcId);
        });
    }

    function changeArcValueById(arcId: string, value: number) {
        setPie((pie) => {
            const datum = pie.data.find((datum) => datum.id === arcId);
            if (datum) {
                datum.value = value;
            }
        });
    }

    function getValueById(arcId: string): number {
        const datum = pie.data.find((datum) => datum.id === arcId);
        if (datum) {
            return datum.value;
        } else return 0;
    }

    function getDatumById(arcId: string):
        | (DefaultRawDatum & {
              label: string;
              color?: string;
          })
        | undefined {
        const datum = pie.data.find((datum) => datum.id === arcId);
        if (datum) {
            return pie.data.find((datum) => datum.id === arcId);
        }
    }

    function changeId(arcId: string, newId: string) {
        setPie((pie) => {
            const datum = pie.data.find((datum) => datum.id === arcId);
            if (datum) {
                datum.label = newId;
            }
        });
    }

    return {
        pie,
        addArc,
        removeArcById,
        changeArcValueById,
        data: pie.data,
        getValueById,
        getDatumById,
        changeId,
    };
}
