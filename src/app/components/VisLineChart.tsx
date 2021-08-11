import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer} from 'recharts';
import {CurveType} from 'recharts/types/shape/Curve';
import {useImmer} from 'use-immer';
import {setActiveKey} from '../features/chart/lineChartSlice';
import {RootState} from '../redux/store';

export default function VisLineChart() {
    const [hoveringKey, setHoveringKey] = useImmer('');
    const dispatch = useDispatch();
    // const

    const {
        showXAxis,
        showYAxis,
        data,
        showLegend,
        margin,
        legendLayout,
        legendAlign,
        legendVerticalAlign,
        xAxisLabel,
        lines,
        showCartesianGrid,
        activeKey,
        scale,
    } = useSelector((state: RootState) => state.chart);

    return (
        <ResponsiveContainer width={`${100 * scale}%`} height={`${100 * scale}%`}>
            <LineChart data={data} margin={margin}>
                {showCartesianGrid ? <CartesianGrid strokeDasharray="3 3" /> : null}
                <XAxis dataKey="name" label={{value: xAxisLabel, position: 'bottom'}} hide={!showXAxis} />
                {showYAxis ? <YAxis /> : null}
                {showLegend ? (
                    <Legend
                        layout={legendLayout}
                        align={legendAlign}
                        verticalAlign={legendVerticalAlign}
                        onClick={(e) => {
                            console.log(e);
                        }}
                    />
                ) : null}
                {lines.map((item) => {
                    return (
                        <Line
                            style={{cursor: 'pointer'}}
                            key={item.key}
                            id={item.key}
                            onMouseEnter={() => setHoveringKey(item.key)}
                            onMouseLeave={() => setHoveringKey('')}
                            onClick={() => dispatch(setActiveKey(item.key))}
                            type={item.curveType as CurveType}
                            dataKey={item.key}
                            stroke={activeKey && activeKey !== item.key ? item.color + '33' : item.color}
                            strokeWidth={hoveringKey === item.key ? 3 : 2}
                            activeDot={{r: 8}}
                        ></Line>
                    );
                })}
            </LineChart>
        </ResponsiveContainer>
    );
}
