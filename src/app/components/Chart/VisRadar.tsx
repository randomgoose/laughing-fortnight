import * as React from 'react';
import StyledRnd from '../StyledComponents/StyledRnd';
import _ from 'lodash';
import {Param} from '../../atoms/appAtom';
import {useImmerAtom} from 'jotai/immer';
import {ResponsiveRadar} from '@nivo/radar';
import {radarAtomFamily, RadarState} from '../../atoms/radarAtomFamily';

const VisRadar = ({id, initialState}: Param & {initialState?: RadarState}) => {
    const [radar, setRadar] = useImmerAtom(radarAtomFamily({id}));

    React.useEffect(() => {
        if (initialState)
            setRadar((radar) => {
                Object.assign(radar, initialState);
            });
    }, []);

    function onDragStop(_e, d) {
        setRadar((radar) => {
            radar.x = d.x;
            radar.y = d.y;
        });
    }

    function onResize(_e, _direction, ref, _delta, position) {
        setRadar((radar) => {
            radar.width = parseFloat(ref.style.width);
            radar.height = parseFloat(ref.style.height);
            radar.x = position.x;
            radar.y = position.y;
        });
    }

    return (
        <StyledRnd
            chartId={id}
            width={radar.width}
            height={radar.height}
            x={radar.x}
            y={radar.y}
            onDragStop={onDragStop}
            onResize={onResize}
        >
            <ResponsiveRadar {...radar} />
        </StyledRnd>
    );
};

export default VisRadar;
