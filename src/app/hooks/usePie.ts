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
            pie.data.find((datum) => datum.id === arcId).value = value;
        });
    }

    function getValueById(arcId: string): number {
        return pie.data.find((datum) => datum.id === arcId).value;
    }

    function getDatumById(arcId: string): DefaultRawDatum & {
        label: string;
        color?: string;
    } {
        return pie.data.find((datum) => datum.id === arcId);
    }

    function changeId(arcId: string, newId: string) {
        setPie((pie) => {
            pie.data.find((datum) => datum.id === arcId).label = newId;
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
