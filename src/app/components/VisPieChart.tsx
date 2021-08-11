import * as React from 'react';
import {useSelector} from 'react-redux';
import {PieChart, Pie, Tooltip, ResponsiveContainer} from 'recharts';
import {RootState} from '../redux/store';

export default function VisPieChart() {
    const {data} = useSelector((state: RootState) => state.pie);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}
