import * as React from 'react';
import {ResponsiveLine} from '@nivo/line';
import {useImmerAtom} from 'jotai/immer';
import {LineState} from '../../atoms/lineAtomFamily';
import {PrimitiveAtom} from 'jotai';

export default function VisLineChart({initialState, atom}: {initialState?: LineState; atom: PrimitiveAtom<LineState>}) {
    const [{width, height, x, y, activeSerie, showXAxis, showYAxis, data, lines, ...rest}, setLine] =
        useImmerAtom(atom);

    React.useEffect(() => {
        if (initialState)
            setLine((line) => {
                Object.assign(line, initialState);
            });
    }, []);

    return (
        <ResponsiveLine
            {...rest}
            axisBottom={showXAxis ? rest.axisBottom : undefined}
            axisLeft={showYAxis ? rest.axisLeft : undefined}
            data={data.filter((datum) => lines.includes(datum.id))}
            isInteractive={true}
        />
    );
}
// data={data}
//

// export default function VisLineChart() {
//     const [hoveringKey, setHoveringKey] = useImmer('');
//     const dispatch = useDispatch();
//     // const

//     return (
//         <ResponsiveContainer width={`${100 * scale}%`} height={`${100 * scale}%`}>
//             <LineChart data={data} margin={margin}>
//                 {showCartesianGrid ? <CartesianGrid strokeDasharray="3 3" /> : null}
//                 <XAxis dataKey="name" label={{value: xAxisLabel, position: 'bottom'}} hide={!showXAxis} />
//                 {showYAxis ? <YAxis /> : null}
//                 {showLegend ? (
//                     <Legend
//                         layout={legendLayout}
//                         align={legendAlign}
//                         verticalAlign={legendVerticalAlign}
//                         onClick={(e) => {
//                             console.log(e);
//                         }}
//                     />
//                 ) : null}
//                 {lines.map((item) => {
//                     return (
//                         <Line
//                             style={{cursor: 'pointer'}}
//                             key={item.key}
//                             id={item.key}
//                             onMouseEnter={() => setHoveringKey(item.key)}
//                             onMouseLeave={() => setHoveringKey('')}
//                             onClick={() => dispatch(setActiveSerie(item.key))}
//                             type={item.curveType as CurveType}
//                             dataKey={item.key}
//                             stroke={activeKey && activeKey !== item.key ? item.color + '33' : item.color}
//                             strokeWidth={hoveringKey === item.key ? 3 : 2}
//                             activeDot={{r: 8}}
//                         ></Line>
//                     );
//                 })}
//             </LineChart>
//         </ResponsiveContainer>
//     );
// }
