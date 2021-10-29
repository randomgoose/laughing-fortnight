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
import {Button, Space, Radio, message} from 'antd';
import {AimOutlined, ArrowsAltOutlined, ShrinkOutlined} from '@ant-design/icons';
import {setHideInterface, setPartialState} from '../features/app/appSlice';
import DimensionIndicator from './DimensionIndicator';
import {useTranslation} from 'react-i18next';
import {useAtom} from 'jotai';
import {pieAtomFamily} from '../atoms/pieAtomFamily';

export default function Canvas() {
    const {chartType, hideInterface} = useSelector((state: RootState) => state.app);
    const {line, bar} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [pie, setPie] = useAtom(pieAtomFamily({id: 'pie'}));

    const [{zoom, scale}, set] = useSpring(() => ({
        scale: 1,
        zoom: 0,
        config: {mass: 5, tension: 350, friction: 80},
    }));

    const domTarget = React.useRef(null);
    const ref = React.useRef(null);

    let chart = <VisLineChart />;

    switch (chartType) {
        case 'line':
            chart = <VisLineChart />;
            break;
        case 'pie':
            chart = <VisPieChart id={'pie'} />;
            break;
        case 'bar':
            chart = <VisBarChart />;
            break;
        default:
            chart = <VisLineChart />;
            break;
    }

    const getWidth = () => {
        switch (chartType) {
            case 'line':
                return line.width;
            case 'bar':
                return bar.width;
            case 'pie':
                return pie.width;
        }
    };
    const getHeight = () => {
        switch (chartType) {
            case 'line':
                return line.height;
            case 'bar':
                return bar.height;
            case 'pie':
                return pie.height;
        }
    };

    const bind = usePinch(
        ({offset: [d]}) => {
            set({zoom: d / 1600});
        },
        {domTarget, eventOptions: {passive: false}}
    );

    // const menu = (
    //     <Menu>
    //         <Menu.Item key="2">2nd menu item</Menu.Item>
    //         <Menu.Item key="3">3rd menu item</Menu.Item>
    //     </Menu>
    // )

    return (
        // <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div {...bind()} className={'canvas'} ref={domTarget}>
            <DimensionIndicator width={getWidth()} height={getHeight()} />
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
                {chart}
            </animated.div>
            <Space className={'absolute top-4 right-4'}>
                <Radio.Group
                    value={chartType === 'line' ? line.render : chartType === 'bar' ? bar.render : 'svg'}
                    onChange={(e) => {
                        message.info(t(`Rendering ${e.target.value} component`));
                        if (chartType === 'line') dispatch(setLine({render: e.target.value}));
                        if (chartType === 'bar') dispatch(setBar({render: e.target.value}));
                        if (chartType === 'pie') setPie({...pie, render: e.target.value});
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
