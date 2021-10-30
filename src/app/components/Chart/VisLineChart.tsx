import * as React from 'react';
import {ResponsiveLine, ResponsiveLineCanvas} from '@nivo/line';
import StyledRnd from '../StyledComponents/StyledRnd';
import {useImmerAtom} from 'jotai/immer';
import {lineAtomFamily, LineState} from '../../atoms/lineAtomFamily';
import {PrimitiveAtom, useAtom} from 'jotai';
import {appAtom} from '../../atoms/appAtom';
import DimensionIndicator from '../DimensionIndicator';

export default function VisLineChart({id}: {id: string}) {
    const [{width, height, x, y, render, activeSerie, scale, showXAxis, showYAxis, data, lines, ...rest}, setLine] =
        useImmerAtom(lineAtomFamily({id}) as PrimitiveAtom<LineState>);
    const [app, setApp] = useAtom(appAtom);

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

    // const props = {
    //     margin,
    //     data: data.filter((item) => lines.includes(item.id)),
    //     enableGridX: showGridX,
    //     enableGridY: showGridY,
    //     xScale,
    //     yScale,
    //     yFormat: ' >-.2f',
    //     axisBottom: showXAxis ? axisBottom : null,
    //     axisLeft: showYAxis
    //         ? {
    //             tickSize: 5,
    //             tickPadding: 5,
    //             tickRotation: 0,
    //             legend: 'count',
    //             legendOffset: -40,
    //             legendPosition: 'middle',
    //         }
    //         : null,
    //     colors,
    //     enablePoints,
    //     pointColor,
    //     pointSize,
    //     pointBorderColor: { theme: 'background' },
    //     pointLabelYOffset: -12,
    //     curve,
    //     enableArea,
    //     areaBaselineValue,
    //     areaOpacity,
    //     areaBlendMode,
    //     useMesh: true,
    //     lineWidth,
    //     legends,
    // }

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
            style={{background: id === app.activeKey ? 'rgba(123, 97, 255, .05)' : ''}}
            showHandles={id === app.activeKey}
        >
            {render === 'svg' ? (
                <ResponsiveLine
                    {...rest}
                    axisBottom={showXAxis && rest.axisBottom}
                    axisLeft={showYAxis && rest.axisLeft}
                    data={data.filter((datum) => lines.includes(datum.id))}
                />
            ) : (
                <ResponsiveLineCanvas {...rest} data={data.filter((datum) => lines.includes(datum.id))} />
            )}
            {id === app.activeKey ? <DimensionIndicator width={width} height={height} /> : null}
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
