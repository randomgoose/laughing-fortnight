import * as React from 'react';
import {ResponsiveLine} from '@nivo/line';
import StyledRnd from '../StyledComponents/StyledRnd';
import {useImmerAtom} from 'jotai/immer';
import {lineAtomFamily, LineState} from '../../atoms/lineAtomFamily';
import {PrimitiveAtom} from 'jotai';
import {Param} from '../../atoms/appAtom';

export default function VisLineChart({id, initialState}: Param & {initialState?: LineState}) {
    const [{width, height, x, y, activeSerie, showXAxis, showYAxis, data, lines, ...rest}, setLine] = useImmerAtom(
        lineAtomFamily({id}) as PrimitiveAtom<LineState>
    );

    React.useEffect(() => {
        if (initialState)
            setLine((line) => {
                Object.assign(line, initialState);
            });
    }, []);

    function onDragStop(_e, d) {
        setLine((line) => {
            line.x = d.x;
            line.y = d.y;
        });
    }

    function onResize(_e, _direction, ref, _delta, position) {
        setLine((line) => {
            line.width = ref.style.width;
            line.height = ref.style.height;
            line.x = position.x;
            line.y = position.y;
        });
    }

    return (
        <StyledRnd chartId={id} width={width} height={height} x={x} y={y} onDragStop={onDragStop} onResize={onResize}>
            <ResponsiveLine
                {...rest}
                axisBottom={showXAxis && rest.axisBottom}
                axisLeft={showYAxis && rest.axisLeft}
                data={data.filter((datum) => lines.includes(datum.id))}
                isInteractive={true}
            />
        </StyledRnd>
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
