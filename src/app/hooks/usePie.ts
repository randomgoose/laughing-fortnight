import cryptoRandomString from 'crypto-random-string';
import {useImmerAtom} from 'jotai/immer';
import {pieAtomFamily} from '../atoms/pieAtomFamily';
import {generateRandomHexColor} from '../utils/generateRandomHexColor';

export function usePie(id: string) {
    const [pie, setPie] = useImmerAtom(pieAtomFamily({id}));

    function addArc() {
        const name = cryptoRandomString({length: 4});
        setPie((pie) => {
            pie.data.push({value: 100, label: name, id: name, color: generateRandomHexColor()});
        });
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

    return {
        pie,
        addArc,
        removeArcById,
        changeArcValueById,
        data: pie.data,
    };
}
