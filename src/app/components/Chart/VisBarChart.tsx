import {ResponsiveBar} from '@nivo/bar';
import * as React from 'react';
import StyledRnd from '../StyledComponents/StyledRnd';
import _ from 'lodash';
import {appAtom, Param} from '../../atoms/appAtom';
import {PrimitiveAtom, useAtom} from 'jotai';
import {barAtomFamily, BarState} from '../../atoms/barAtomFamily';
import {useImmerAtom} from 'jotai/immer';
import DimensionIndicator from '../DimensionIndicator';

const VisBarChart = ({id}: Param) => {
    const [bar, setBar] = useImmerAtom(barAtomFamily({id}) as PrimitiveAtom<BarState>);

    const [app, setApp] = useAtom(appAtom);

    function onDragStop(_e, d) {
        setBar((bar) => {
            bar.x = d.x;
            bar.y = d.y;
        });
    }

    function onResize(_e, _direction, ref, _delta, position) {
        setBar((bar) => {
            bar.width = parseFloat(ref.style.width);
            bar.height = parseFloat(ref.style.height);
            bar.x = position.x;
            bar.y = position.y;
        });
    }

    return (
        <StyledRnd
            scale={app.scale}
            width={bar.width}
            height={bar.height}
            x={bar.x}
            y={bar.y}
            onDragStop={onDragStop}
            onResize={onResize}
            style={{background: id === app.activeKey ? 'rgba(123, 97, 255, .05)' : ''}}
            showHandles={id === app.activeKey}
            onMouseDown={() => {
                setApp((app) => ({...app, activeKey: id}));
            }}
        >
            <ResponsiveBar
                {...bar}
                axisBottom={bar.showXAxis && bar.axisBottom}
                axisLeft={bar.showYAxis && bar.axisLeft}
            />
            {id === app.activeKey ? <DimensionIndicator width={bar.width} height={bar.height} /> : null}
        </StyledRnd>
    );
};

export default VisBarChart;
