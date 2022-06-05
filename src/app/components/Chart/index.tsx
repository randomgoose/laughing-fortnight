import {atom, SetStateAction, useAtom} from 'jotai';
import * as React from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {ChartType} from '../../atoms/appAtom';
import {BarState} from '../../atoms/barAtomFamily';
import {ChartAtom, saveHisotryAtom} from '../../atoms/history';
import {LineState} from '../../atoms/lineAtomFamily';
import {selectedAtom} from '../../atoms/selection';
import StyledRnd from '../StyledComponents/StyledRnd';
import VisBarChart from './VisBarChart';
import VisLineChart from './VisLineChart';

const updateAtom = atom(null, (get, set, update: SetStateAction<BarState | LineState>) => {
    const selected = get(selectedAtom);
    if (selected) {
        set(selected, update);
    }
});

export default function VisChart({atom}: {atom: ChartAtom}) {
    const [chart] = useAtom(atom);
    const [, set] = useAtom(updateAtom);
    const [, save] = useAtom(saveHisotryAtom);

    useDeepCompareEffect(() => {
        console.log('canva', chart.width);
    }, [chart]);

    const renderChart = (type: ChartType, atom) => {
        switch (type) {
            case 'BAR':
                return <VisBarChart atom={atom} />;
            case 'LINE':
                return <VisLineChart atom={atom} />;
            default:
                return <VisBarChart atom={atom} />;
        }
    };

    return (
        <StyledRnd
            chartId={chart.key}
            width={chart.width}
            height={chart.height}
            x={chart.x}
            y={chart.y}
            onDragStop={(_e, d) => {
                save(null);
                set((prev) => ({...prev, x: d.x, y: d.y}));
            }}
            onResize={(_e, _direction, ref, _delta, position) => {
                console.log(ref.style.width);
                set((prev) => ({
                    ...prev,
                    width: parseFloat(ref.style.width),
                    height: parseFloat(ref.style.height),
                    x: position.x,
                    y: position.y,
                }));
            }}
            onResizeStop={() => {
                save(null);
            }}
            atom={atom}
        >
            {renderChart(chart.type, atom)}
        </StyledRnd>
    );
}
