import {ResponsiveBar} from '@nivo/bar';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setRndEnabled} from '../../features/app/appSlice';
import {setPartialState} from '../../features/chart/barChartSlice';
import {RootState} from '../../redux/store';
import StyledRnd from '../StyledComponents/StyledRnd';

const VisBarChart = () => {
    // const { data } = useSelector((state:RootState) => state.bar);
    const {
        data,
        groupMode,
        layout,
        reverse,
        padding,
        margin,
        innerPadding,
        showXAxis,
        showYAxis,
        enableGridX,
        enableGridY,
        keys,
        width,
        height,
        x,
        y,
        scale,
        indexBy,
    } = useSelector((state: RootState) => state.bar);

    const {rndEnabled} = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();

    React.useEffect(() => {
        console.log(rndEnabled);
    }, [rndEnabled]);

    function onDragStop(_e, d) {
        dispatch(setPartialState({x: d.x, y: d.y}));
    }

    function onResize(_e, _direction, ref, _delta, position) {
        dispatch(
            setPartialState({
                width: ref.style.width,
                height: ref.style.height,
                x: position.x,
                y: position.y,
            })
        );
    }

    return (
        <StyledRnd scale={scale} width={width} height={height} x={x} y={y} onDragStop={onDragStop} onResize={onResize}>
            <ResponsiveBar
                groupMode={groupMode}
                layout={layout}
                reverse={reverse}
                data={data}
                keys={keys}
                onClick={() => {
                    dispatch(setRndEnabled(true));
                }}
                indexBy={indexBy}
                margin={margin}
                padding={padding}
                innerPadding={innerPadding}
                enableGridX={enableGridX}
                enableGridY={enableGridY}
                valueScale={{type: 'linear'}}
                indexScale={{type: 'band', round: true}}
                // valueFormat={{format: '', enabled: false}}
                colors={{scheme: 'nivo'}}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'sandwich',
                        },
                        id: 'lines',
                    },
                ]}
                borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                axisTop={null}
                axisRight={null}
                axisBottom={
                    showXAxis && {
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: 32,
                    }
                }
                axisLeft={
                    showYAxis && {
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'food',
                        legendPosition: 'middle',
                        legendOffset: -40,
                    }
                }
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </StyledRnd>
    );
};

export default VisBarChart;
