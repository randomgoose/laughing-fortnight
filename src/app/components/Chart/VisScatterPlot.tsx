import {ResponsiveScatterPlot} from '@nivo/scatterplot';
import {PrimitiveAtom, useAtom} from 'jotai';
import {useImmerAtom} from 'jotai/immer';
import * as React from 'react';
import {appAtom, Param} from '../../atoms/appAtom';
import {scatterAtomFamily, ScatterState} from '../../atoms/scatterAtomFamily';
import StyledRnd from '../StyledComponents/StyledRnd';

export default function VisScatterPlot({id}: Param) {
    const [{activeKey, scale}, setApp] = useAtom(appAtom);
    const [{width, height, x, y, ...rest}, setScatter] = useImmerAtom(
        scatterAtomFamily({id}) as PrimitiveAtom<ScatterState>
    );

    function onDragStop(_e, d) {
        setScatter((scatter) => {
            scatter.x = d.x;
            scatter.y = d.y;
        });
    }

    function onResize(_e, _direction, ref, _delta, position) {
        setScatter((scatter) => {
            scatter.width = parseFloat(ref.style.width);
            scatter.height = parseFloat(ref.style.height);
            scatter.x = position.x;
            scatter.y = position.y;
        });
    }

    return (
        <StyledRnd
            onMouseDown={() => {
                setApp((app) => ({...app, activeKey: id}));
            }}
            scale={scale}
            width={width}
            height={height}
            x={x}
            y={y}
            onDragStop={onDragStop}
            onResize={onResize}
            style={{background: id === activeKey ? 'rgba(123, 97, 255, .05)' : ''}}
            showHandles={id === activeKey}
        >
            <ResponsiveScatterPlot {...rest} />
        </StyledRnd>
    );
}
