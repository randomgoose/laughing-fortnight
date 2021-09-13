import {BarDatum, BarSvgProps, ResponsiveBar, ResponsiveBarCanvas} from '@nivo/bar';
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPartialState} from '../../features/chart/barChartSlice';
import {RootState} from '../../redux/store';
import StyledRnd from '../StyledComponents/StyledRnd';
import {message} from 'antd';
import _ from 'lodash';

const VisBarChart = () => {
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
        render,
        colors,
        axisLeft,
        axisBottom,
        // activeIndex,
    } = useSelector((state: RootState) => state.bar);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (data.length > 10) {
            message.info('当前数据量较大，自动切换为性能更佳的 Canvas');
        }
        // dispatch(setPartialState({activeIndex: -1}));
    }, [data]);

    // React.useEffect(() => {
    //     console.log(activeIndex);
    // }, [activeIndex]);

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

    const props: Omit<BarSvgProps<BarDatum>, 'width' | 'height' | 'onMouseEnter' | 'onMouseLeave' | 'layers'> = {
        groupMode,
        layout,
        reverse,
        data,
        keys,
        indexBy,
        margin,
        padding,
        innerPadding,
        enableGridX,
        enableGridY,
        colors,
        axisBottom,
        axisLeft,
    };

    return (
        <StyledRnd scale={scale} width={width} height={height} x={x} y={y} onDragStop={onDragStop} onResize={onResize}>
            {render === 'canvas' ? (
                <ResponsiveBarCanvas
                    {...props}
                    onClick={(datum, event) => {
                        console.log(datum, event);
                    }}
                    valueScale={{type: 'linear'}}
                    indexScale={{type: 'band', round: true}}
                    // valueFormat={{format: '', enabled: false}}
                    borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={
                        showXAxis && {
                            ...axisBottom,
                            legend: _.isString(axisBottom.legend) ? (axisBottom.legend as string) : 'title',
                        }
                    }
                    axisLeft={
                        showYAxis && {
                            ...axisLeft,
                            legend: _.isString(axisLeft.legend) ? (axisLeft.legend as string) : 'title',
                        }
                    }
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                    legends={legends}
                ></ResponsiveBarCanvas>
            ) : (
                <ResponsiveBar
                    {...props}
                    onClick={(datum) => {
                        dispatch(setPartialState({activeIndex: datum.index, activeDatum: datum}));
                    }}
                    valueScale={{type: 'linear'}}
                    indexScale={{type: 'band', round: true}}
                    // valueFormat={{format: '', enabled: false}}
                    borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={showXAxis && axisBottom}
                    axisLeft={showYAxis && axisLeft}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                    legends={legends}
                    onMouseEnter={(_datum, e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
                        e.currentTarget.style.stroke = '#00BCD4';
                        e.currentTarget.style.strokeWidth = '2';
                        e.currentTarget.style.cursor = 'pointer';
                    }}
                    onMouseLeave={(_datum, e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
                        e.currentTarget.style.stroke = null;
                        e.currentTarget.style.opacity = '0.8';
                        e.currentTarget.style.strokeWidth = '0';
                    }}
                />
            )}
        </StyledRnd>
    );
};

export default VisBarChart;
