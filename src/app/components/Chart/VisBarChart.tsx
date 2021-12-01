import {ResponsiveBar} from '@nivo/bar';
import * as React from 'react';
import StyledRnd from '../StyledComponents/StyledRnd';
import _ from 'lodash';
import {Param} from '../../atoms/appAtom';
import {PrimitiveAtom} from 'jotai';
import {barAtomFamily, BarState} from '../../atoms/barAtomFamily';
import {useImmerAtom} from 'jotai/immer';

const VisBarChart = ({id, initialState}: Param & {initialState?: BarState}) => {
    const [bar, setBar] = useImmerAtom(barAtomFamily({id}) as PrimitiveAtom<BarState>);

    function onDragStop(_e, d) {
        setBar((bar) => {
            bar.x = d.x;
            bar.y = d.y;
        });
    }

    React.useEffect(() => {
        if (initialState)
            setBar((bar) => {
                Object.assign(bar, initialState);
            });
    }, []);

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
            chartId={id}
            width={bar.width}
            height={bar.height}
            x={bar.x}
            y={bar.y}
            onDragStop={onDragStop}
            onResize={onResize}
        >
            <ResponsiveBar
                {...bar}
                axisBottom={bar.showXAxis && bar.axisBottom}
                axisLeft={bar.showYAxis && bar.axisLeft}
                onClick={(datum, event) => {
                    console.log(datum);
                    console.log(event);
                }}
            />
        </StyledRnd>
    );
};

export default VisBarChart;
