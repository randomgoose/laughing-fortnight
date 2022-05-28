//@ts-nocheck
import * as React from 'react';
import VisLineChart from './Chart/VisLineChart';
import VisPieChart from './Chart/VisPieChart';
import VisBarChart from './Chart/VisBarChart';
import {useSpring} from '@react-spring/core';
import {animated} from '@react-spring/web';
import {Button, Space} from 'antd';
import {AimOutlined, ArrowsAltOutlined, ShrinkOutlined} from '@ant-design/icons';
import {useAtom} from 'jotai';
import {appAtom, Chart} from '../atoms/appAtom';
import VisScatterPlot from './Chart/VisScatterPlot';
import VisRadar from './Chart/VisRadar';
import VisCalendar from './Chart/VisCalendar';
import {createUseGesture, pinchAction, wheelAction} from '@use-gesture/react';
import {chartAtomsAtom, undoAtom} from '../atoms/history';
import {deleteSelectedChart} from '../atoms/selection';
import VisChart from './Chart';
import {useToast} from '@chakra-ui/react';

const useGesture = createUseGesture([pinchAction, wheelAction]);

export default function Canvas() {
    const [app, setApp] = useAtom(appAtom);
    const [charts] = useAtom(chartAtomsAtom);
    const [, del] = useAtom(deleteSelectedChart);

    const [hasHistory, undo] = useAtom(undoAtom);

    React.useEffect(() => {
        const handler = (e) => e.preventDefault();
        document.addEventListener('gesturestart', handler);
        document.addEventListener('gesturechange', handler);
        document.addEventListener('gestureend', handler);
        return () => {
            document.removeEventListener('gesturestart', handler);
            document.removeEventListener('gesturechange', handler);
            document.removeEventListener('gestureend', handler);
        };
    }, []);

    const [style, api] = useSpring(() => ({
        x: 0,
        y: 0,
        scale: 1,
        rotateZ: 0,
    }));

    const ref = React.useRef<HTMLDivElement>(null);
    const wrapperRef = React.useRef(null);

    useGesture(
        {
            onWheel: ({event, offset: [x, y], direction: [_dx, _dy]}) => {
                event.preventDefault();
                api.start({y: -y, x: -x});
            },
        },
        {
            target: wrapperRef,
        }
    );

    useGesture(
        {
            // onHover: ({ active, event }) => console.log('hover', event, active),
            // onMove: ({ event }) => console.log('move', event),

            // onDrag: ({ pinching, cancel, offset: [x, y] }) => {
            //     if (pinching) return cancel()
            //     api.start({ x, y })
            // },
            onPinch: ({origin: [ox, oy], first, movement: [ms], offset: [s, a], memo}) => {
                if (first) {
                    if (ref.current) {
                        const {width, height, x, y} = ref.current.getBoundingClientRect();
                        const tx = ox - (x + width / 2);
                        const ty = oy - (y + height / 2);
                        memo = [style.x.get(), style.y.get(), tx, ty];
                    }
                }

                const x = memo[0] - ms * memo[2];
                const y = memo[1] - ms * memo[3];
                api.start({scale: s, rotateZ: a, x, y});

                setApp({...app, scale: s});
                return memo;
            },
        },
        {
            target: ref,
            // drag: { from: () => [style.x.get(), style.y.get()] },
            pinch: {scaleBounds: {min: 0.1, max: 4}, rubberband: true},
        }
    );

    // const [{ zoom, scale }, set] = useSpring(() => ({
    //     scale: 1,
    //     zoom: 0,
    //     config: { mass: 5, tension: 350, friction: 80 },
    // }))

    // function renderChart(chart: Chart) {
    //     switch (chart.type) {
    //         case 'pie':
    //             return <VisPieChart id={chart.id} key={chart.id} initialState={chart.initialState} />;
    //         case 'bar':
    //         // return <VisBarChart key={chart.id} initialState={chart.initialState} />;
    //         case 'line':
    //             return <VisLineChart id={chart.id} key={chart.id} initialState={chart.initialState} />;
    //         case 'scatter':
    //             return <VisScatterPlot id={chart.id} key={chart.id} initialState={chart.initialState} />;
    //         case 'radar':
    //             return <VisRadar id={chart.id} key={chart.id} initialState={chart.initialState} />;
    //         case 'calendar':
    //             return <VisCalendar id={chart.id} key={chart.id} initialState={chart.initialState} />;
    //     }
    // }

    // const bind = usePinch(
    //     ({ offset: [d] }) => {
    //         set({ zoom: d / 1600 })
    //         setApp({ ...app, scale: 1 + d / 1600 })
    //     },
    //     { domTarget, eventOptions: { passive: false } }
    // )

    return (
        <div
            className={'canvas__wrapper w-full h-full overflow-hidden z-0'}
            ref={wrapperRef}
            tabIndex={1}
            onKeyDown={(e: React.KeyboardEvent) => {
                // e.preventDefault()
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    del();
                    setApp({...app, activeKey: '', charts: app.charts.filter((chart) => chart.id !== app.activeKey)});
                }
            }}
        >
            <animated.div ref={ref} className={'w-full h-full absolute'} style={style}>
                {charts.map((atom) => (
                    <VisChart atom={atom} key={`${atom}`} />
                ))}
                {/* {app.charts.length > 0 ? (
                    app.charts.map((chart) => renderChart(chart))
                ) : (
                    <div
                        className={
                            'absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center'
                        }
                    >
                        <ChartTypeList
                            tooltipPlacement={'top'}
                            className={
                                'border border-dashed border-purple-600 p-6 rounded-lg flex flex-row justify-center'
                            }
                        />
                        <span className={'text-gray-700'}>{t('Click an icon to insert a chart')}</span>
                    </div>
                )} */}
            </animated.div>
            <Space className={'absolute top-4 right-4'}>
                <Button disabled={!hasHistory} onClick={undo}>
                    undo
                </Button>
                {!app.hideInterface ? (
                    <Button
                        icon={<ArrowsAltOutlined />}
                        onClick={() => {
                            setApp({...app, hideInterface: true});
                        }}
                    />
                ) : (
                    <Button
                        icon={<ShrinkOutlined />}
                        onClick={() => {
                            setApp({...app, hideInterface: false});
                        }}
                    />
                )}
                <Button
                    icon={<AimOutlined />}
                    onClick={() => {
                        setApp({...app, scale: 1});
                        // set({ zoom: 0, scale: 1 })
                    }}
                ></Button>
            </Space>
        </div>
    );
}
