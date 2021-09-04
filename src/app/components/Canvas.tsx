//@ts-nocheck
import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import VisLineChart from './Chart/VisLineChart';
import VisPieChart from './Chart/VisPieChart';
import VisBarChart from './Chart/VisBarChart';
import {setPartialState as setLine} from '../features/chart/lineChartSlice';
import {setPartialState as setBar} from '../features/chart/barChartSlice';
import {usePinch} from 'react-use-gesture';
import {useSpring, to} from '@react-spring/core';
import {animated} from '@react-spring/web';

export default function Canvas() {
    const {chartType} = useSelector((state: RootState) => state.app);
    const {line, bar} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const [{zoom, scale}, set] = useSpring(() => ({
        scale: 1,
        zoom: 0,
        config: {mass: 5, tension: 350, friction: 80},
    }));

    React.useEffect(() => {
        console.log(zoom);
    }, [zoom]);

    const domTarget = React.useRef(null);
    const ref = React.useRef(null);

    let chart = <VisLineChart />;

    switch (chartType) {
        case 'line':
            chart = <VisLineChart />;
            break;
        case 'pie':
            chart = <VisPieChart />;
            break;
        case 'bar':
            chart = <VisBarChart />;
            break;
        default:
            chart = <VisLineChart />;
    }

    function getScale() {
        if (chartType === 'line') return line.scale;
        if (chartType === 'bar') return bar.scale;
    }

    const bind = usePinch(
        ({offset: [d, a], direction, delta}) => {
            set({zoom: d / 1000});
        },
        {domTarget, eventOptions: {passive: false}}
    );

    return (
        <div
            {...bind()}
            style={{width: '100%', height: '100%', overflow: 'scroll', position: 'relative'}}
            className={'canvas'}
            ref={domTarget}
        >
            <animated.div
                ref={ref}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    scale: to([scale, zoom], (s, z) => {
                        if (s + z >= 0) {
                            if (chartType === 'line') dispatch(setLine({scale: s + z}));
                            if (chartType === 'bar') dispatch(setBar({scale: s + z}));
                            return s + z;
                        }
                    }),
                }}
            >
                {chart}
            </animated.div>
        </div>
    );
}
