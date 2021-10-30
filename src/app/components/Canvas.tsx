import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import VisLineChart from './Chart/VisLineChart';
import VisPieChart from './Chart/VisPieChart';
import VisBarChart from './Chart/VisBarChart';
import {usePinch} from 'react-use-gesture';
import {useSpring, to} from '@react-spring/core';
import {animated} from '@react-spring/web';
import {Button, Space, Radio} from 'antd';
import {AimOutlined, ArrowsAltOutlined, ShrinkOutlined} from '@ant-design/icons';
import {setHideInterface, setPartialState} from '../features/app/appSlice';
import {useAtom} from 'jotai';
import {appAtom, Chart} from '../atoms/appAtom';
import {ChartTypeList} from './ChartTypeList';
import {useTranslation} from 'react-i18next';

export default function Canvas() {
    const {hideInterface} = useSelector((state: RootState) => state.app);
    const [app, setApp] = useAtom(appAtom);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    React.useEffect(() => {
        console.log(app.charts);
    }, [app]);

    const [{zoom, scale}, set] = useSpring(() => ({
        scale: 1,
        zoom: 0,
        config: {mass: 5, tension: 350, friction: 80},
    }));

    const domTarget = React.useRef(null);
    const ref = React.useRef(null);

    // let chart = <VisLineChart />

    function renderChart(chart: Chart) {
        switch (chart.type) {
            case 'pie':
                return <VisPieChart id={chart.id} key={chart.id} />;
            case 'bar':
                return <VisBarChart key={chart.id} />;
            case 'line':
                return <VisLineChart id={chart.id} key={chart.id} />;
        }
    }

    // switch (chartType) {
    //     case 'line':
    //         chart = <VisLineChart />
    //         break
    //     case 'bar':
    //         chart = <VisBarChart />
    //         break
    //     default:
    //         chart = <VisLineChart />
    //         break
    // }

    // const getWidth = () => {
    //     switch (chartType) {
    //         case 'line':
    //             return line.width
    //         case 'bar':
    //             return bar.width
    //     }
    // }
    // const getHeight = () => {
    //     switch (chartType) {
    //         case 'line':
    //             return line.height
    //         case 'bar':
    //             return bar.height
    //     }
    // }

    const bind = usePinch(
        ({offset: [d]}) => {
            set({zoom: d / 1600});
        },
        {domTarget, eventOptions: {passive: false}}
    );
    return (
        // <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div
            {...bind()}
            className={'canvas'}
            ref={domTarget}
            tabIndex={1}
            onKeyDown={(e: React.KeyboardEvent) => {
                e.preventDefault();
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    setApp({...app, activeKey: '', charts: app.charts.filter((chart) => chart.id !== app.activeKey)});
                }
            }}
        >
            {/* <DimensionIndicator width={getWidth()} height={getHeight()} /> */}
            <animated.div
                ref={ref}
                className={'w-full h-full absolute'}
                style={{
                    scale: to([scale, zoom], (s, z) => {
                        if (s + z >= 0) {
                            dispatch(setPartialState({scale: s + z}));
                            return s + z;
                        }
                    }),
                }}
            >
                {/* {chart} */}
                {app.charts.length > 0 ? (
                    app.charts.map((chart) => renderChart(chart))
                ) : (
                    <div
                        className={
                            'absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2'
                        }
                    >
                        <ChartTypeList
                            className={
                                'border border-dashed border-purple-600 p-6 rounded-lg flex flex-row justify-center'
                            }
                        />
                        <span className={'text-gray-700'}>{t('Click an icon to insert a chart')}</span>
                    </div>
                )}
            </animated.div>
            <Space className={'absolute top-4 right-4'}>
                <Radio.Group
                    // value={chartType === 'line' ? line.render : chartType === 'bar' ? bar.render : 'svg'}
                    // onChange={(e) => {
                    //     message.info(t(`Rendering ${e.target.value} component`))
                    //     if (chartType === 'line') dispatch(setLine({ render: e.target.value }))
                    //     if (chartType === 'bar') dispatch(setBar({ render: e.target.value }))
                    // }}
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
                <Button
                    icon={<AimOutlined />}
                    onClick={() => {
                        dispatch(setPartialState({scale: 1}));
                        set({scale: 1, zoom: 0});
                    }}
                ></Button>
            </Space>
        </div>
        // </Dropdown>
    );
}
