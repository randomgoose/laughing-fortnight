import {ResponsiveScatterPlot} from '@nivo/scatterplot';
import {PrimitiveAtom} from 'jotai';
import {useImmerAtom} from 'jotai/immer';
import * as React from 'react';
import {Param} from '../../atoms/appAtom';
import {scatterAtomFamily, ScatterState} from '../../atoms/scatterAtomFamily';
import StyledRnd from '../StyledComponents/StyledRnd';

export default function VisScatterPlot({id, initialState}: Param & {initialState?: ScatterState}) {
    const [{width, height, x, y, enableXAxis, enableYAxis, ...rest}, setScatter] = useImmerAtom(
        scatterAtomFamily({id}) as PrimitiveAtom<ScatterState>
    );

    React.useEffect(() => {
        if (initialState)
            setScatter((scatter) => {
                Object.assign(scatter, initialState);
            });
    }, []);

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
        <StyledRnd chartId={id} width={width} height={height} x={x} y={y} onDragStop={onDragStop} onResize={onResize}>
            <ResponsiveScatterPlot
                {...rest}
                axisBottom={enableXAxis && rest.axisBottom}
                axisLeft={enableYAxis && rest.axisLeft}
            />
        </StyledRnd>
    );
}
