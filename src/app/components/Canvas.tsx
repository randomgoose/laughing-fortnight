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
import {Button, Space, Radio} from 'antd';
import {ArrowsAltOutlined, ShrinkOutlined} from '@ant-design/icons';
import {setHideInterface} from '../features/app/appSlice';
import DimensionIndicator from './DimensionIndicator';

export default function Canvas() {
    const {chartType, hideInterface} = useSelector((state: RootState) => state.app);
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

    const bind = usePinch(
        ({offset: [d]}) => {
            set({zoom: d / 1600});
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
            <DimensionIndicator
                width={chartType === 'line' ? line.width : chartType === 'bar' ? bar.width : 0}
                height={chartType === 'line' ? line.height : chartType === 'bar' ? bar.height : 0}
                style={{position: 'absolute', top: 24, left: '50%', transform: 'translate(-50%, -50%)'}}
            />
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
            <Space style={{position: 'absolute', top: 16, right: 16}}>
                <Radio.Group
                    value={chartType === 'line' ? line.render : chartType === 'bar' ? bar.render : 'svg'}
                    onChange={(e) => {
                        console.log(e.target.value);
                        if (chartType === 'line') dispatch(setLine({render: e.target.value}));
                        if (chartType === 'bar') dispatch(setBar({render: e.target.value}));
                    }}
                    options={[
                        {
                            value: 'svg',
                            label: 'SVG',
                        },
                        {
                            value: 'canvas',
                            label: 'Canvas',
                        },
                    ]}
                    optionType={'button'}
                ></Radio.Group>
                {!hideInterface ? (
                    <Button icon={<ArrowsAltOutlined />} onClick={() => dispatch(setHideInterface(true))} />
                ) : (
                    <Button icon={<ShrinkOutlined />} onClick={() => dispatch(setHideInterface(false))} />
                )}
            </Space>
        </div>
    );
}
