import * as React from 'react';
import VisLineChart from './Chart/VisLineChart';
import VisPieChart from './Chart/VisPieChart';
import VisBarChart from './Chart/VisBarChart';
import {usePinch} from 'react-use-gesture';
import {useSpring, to} from '@react-spring/core';
import {animated} from '@react-spring/web';
import {Button, Space} from 'antd';
import {AimOutlined, ArrowsAltOutlined, ShrinkOutlined} from '@ant-design/icons';
import {useAtom} from 'jotai';
import {appAtom, Chart} from '../atoms/appAtom';
import {ChartTypeList} from './ChartTypeList';
import {useTranslation} from 'react-i18next';
import VisScatterPlot from './Chart/VisScatterPlot';
import VisRadar from './Chart/VisRadar';
import VisCalendar from './Chart/VisCalendar';

export default function Canvas() {
    const [app, setApp] = useAtom(appAtom);
    const {t} = useTranslation();

    const [{zoom, scale}, set] = useSpring(() => ({
        scale: 1,
        zoom: 0,
        config: {mass: 5, tension: 350, friction: 80},
    }));

    const domTarget = React.useRef(null);
    const ref = React.useRef(null);

    function renderChart(chart: Chart) {
        switch (chart.type) {
            case 'pie':
                return <VisPieChart id={chart.id} key={chart.id} initialState={chart.initialState} />;
            case 'bar':
                return <VisBarChart id={chart.id} key={chart.id} initialState={chart.initialState} />;
            case 'line':
                return <VisLineChart id={chart.id} key={chart.id} initialState={chart.initialState} />;
            case 'scatter':
                return <VisScatterPlot id={chart.id} key={chart.id} initialState={chart.initialState} />;
            case 'radar':
                return <VisRadar id={chart.id} key={chart.id} initialState={chart.initialState} />;
            case 'calendar':
                return <VisCalendar id={chart.id} key={chart.id} initialState={chart.initialState} />;
        }
    }

    const bind = usePinch(
        ({offset: [d]}) => {
            set({zoom: d / 1600});
            setApp({...app, scale: 1 + d / 1600});
        },
        {domTarget, eventOptions: {passive: false}}
    );

    return (
        <div
            {...bind()}
            className={'canvas__wrapper'}
            ref={domTarget}
            tabIndex={1}
            onKeyDown={(e: React.KeyboardEvent) => {
                // e.preventDefault()
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    setApp({...app, activeKey: '', charts: app.charts.filter((chart) => chart.id !== app.activeKey)});
                }
            }}
        >
            <animated.div
                ref={ref}
                className={'w-full h-full absolute'}
                style={{
                    scale: to([scale, zoom], (s, z) => {
                        if (s + z >= 0) {
                            return s + z;
                        }
                    }),
                }}
            >
                {app.charts.length > 0 ? (
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
                )}
            </animated.div>
            <Space className={'absolute top-4 right-4'}>
                {/* <Radio.Group
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
                ></Radio.Group> */}
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
                        set({zoom: 0, scale: 1});
                    }}
                ></Button>
            </Space>
        </div>
    );
}
