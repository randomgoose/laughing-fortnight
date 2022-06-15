import * as React from 'react';
import _ from 'lodash';
import {useImmerAtom} from 'jotai/immer';
import {ResponsiveRadar} from '@nivo/radar';
import {RadarState} from '../../atoms/radarAtomFamily';
import {PrimitiveAtom} from 'jotai';

const VisRadar = ({atom, initialState}: {atom: PrimitiveAtom<RadarState>; initialState?: RadarState}) => {
    const [radar, setRadar] = useImmerAtom(atom);

    React.useEffect(() => {
        if (initialState)
            setRadar((radar) => {
                Object.assign(radar, initialState);
            });
    }, []);

    return <ResponsiveRadar {...radar} />;
};

export default VisRadar;
