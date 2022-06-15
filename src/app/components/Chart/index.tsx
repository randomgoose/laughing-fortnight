import {atom, SetStateAction, useAtom} from 'jotai';
import * as React from 'react';
import {ChartState, ChartType} from '../../../types';
import {ChartAtom, saveHisotryAtom} from '../../atoms/history';
import {selectChartAtom, selectedAtom} from '../../atoms/selection';
import StyledRnd from '../StyledComponents/StyledRnd';
import VisBarChart from './VisBarChart';
import VisCalendar from './VisCalendar';
import VisLineChart from './VisLineChart';
import VisPieChart from './VisPieChart';
import VisRadar from './VisRadar';
import VisScatterPlot from './VisScatterPlot';

const updateAtom = atom(null, (get, set, update: SetStateAction<ChartState>) => {
    const selected = get(selectedAtom);
    if (selected) {
        set(selected, update);
    }
});

export default function VisChart({atom}: {atom: ChartAtom}) {
    const [chart] = useAtom(atom);
    const [, set] = useAtom(updateAtom);
    const [, save] = useAtom(saveHisotryAtom);
    const [, select] = useAtom(selectChartAtom);

    const renderChart = (type: ChartType, atom) => {
        switch (type) {
            case 'BAR':
                return <VisBarChart atom={atom} />;
            case 'LINE':
                return <VisLineChart atom={atom} />;
            case 'PIE':
                return <VisPieChart atom={atom} />;
            case 'RADAR':
                return <VisRadar atom={atom} />;
            case 'SCATTER':
                return <VisScatterPlot atom={atom} />;
            case 'CALENDAR':
                return <VisCalendar atom={atom} />;
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
            onMouseDown={() => {
                select(atom);
            }}
        >
            {renderChart(chart.type, atom)}
        </StyledRnd>
    );
}
