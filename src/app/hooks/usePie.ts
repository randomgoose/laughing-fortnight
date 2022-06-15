import {DefaultRawDatum} from '@nivo/pie';
import cryptoRandomString from 'crypto-random-string';
import {useImmerAtom} from 'jotai/immer';
import {pieAtomFamily} from '../atoms/pieAtomFamily';

export function usePie(id: string) {
    const [pie, setPie] = useImmerAtom(pieAtomFamily({id}));

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
        setPie,
        addArc,
        removeArcById,
        changeArcValueById,
        data: pie.data,
        getValueById,
        getDatumById,
        changeId,
    };
}
