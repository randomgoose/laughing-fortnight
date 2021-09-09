import {ResponsiveBar, ResponsiveBarCanvas} from '@nivo/bar';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setRndEnabled} from '../../features/app/appSlice';
import {setPartialState} from '../../features/chart/barChartSlice';
import {RootState} from '../../redux/store';
import StyledRnd from '../StyledComponents/StyledRnd';
import {message} from 'antd';

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
        legends,
    } = useSelector((state: RootState) => state.bar);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (data.length > 10) {
            message.info('当前数据量较大，自动切换为性能更佳的 Canvas');
        }
    }, [data]);

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
            {data.length > 10 ? (
                <ResponsiveBarCanvas
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
                    // enableGridX={enableGridX}
                    // enableGridY={enableGridY}
                    valueScale={{type: 'linear'}}
                    indexScale={{type: 'band', round: true}}
                    // valueFormat={{format: '', enabled: false}}
                    colors={{scheme: 'nivo'}}
                    borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={
                        showXAxis && {
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            // legend: 'country',
                            // legendPosition: 'middle',
                            legendOffset: 32,
                        }
                    }
                    axisLeft={
                        showYAxis && {
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            // legend: 'food',
                            // legendPosition: 'middle',
                            legendOffset: -40,
                        }
                    }
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                    legends={legends}
                ></ResponsiveBarCanvas>
            ) : (
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
                    legends={legends}
                />
            )}
        </StyledRnd>
    );
};

export default VisBarChart;
