import {Popover, PopoverProps} from 'antd';
import cryptoRandomString from 'crypto-random-string';
import {useAtom} from 'jotai';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {FcBarChart, FcCalendar, FcLineChart, FcPieChart, FcRadarPlot, FcScatterPlot} from 'react-icons/fc';
import {addChartAtom, ChartType as IChartType, ChartType as Type, insertChartAtom} from '../atoms/appAtom';
import classnames from 'classnames';
import {Pie} from '@nivo/pie';
import {initialPieState} from '../atoms/pieAtomFamily';
import {examples, IExample} from '../examples';
import {Line} from '@nivo/line';
import {initialLineState} from '../atoms/lineAtomFamily';
import {Bar} from '@nivo/bar';
import {initialBarState} from '../atoms/barAtomFamily';
import {Radar} from '@nivo/radar';

function getChart(type: IChartType, state: any) {
    switch (type) {
        case 'pie':
            return <Pie {...{...initialPieState, ...state}} isInteractive={false} />;
        case 'line':
            return <Line {...{...initialLineState, ...state}} isInteractive={false} />;
        case 'bar':
            return <Bar {...{...initialBarState, ...state}} isInteractive={false} animate={false} />;
        case 'radar':
            return <Radar {...{...initialBarState, ...state}} isInteractive={false} />;
        default:
            return <Pie {...{...initialPieState, ...state}} isInteractive={false} />;
    }
}

export function ChartType({
    type,
    children,
    placement,
}: {
    type?: Type;
    children?: React.ReactNode;
    placement?: PopoverProps['placement'];
}) {
    const {t} = useTranslation();
    const [, insertChart] = useAtom(insertChartAtom);
    const [, addChart] = useAtom(addChartAtom);

    return (
        <Popover
            title={t(type[0].toUpperCase() + type.slice(1))}
            placement={placement}
            content={
                <div className={'grid grid-cols-3 gap-2 max-h-44 overflow-scroll'}>
                    {examples[type] &&
                        examples[type].map((example: IExample<any>, index: number) => (
                            <div
                                className={
                                    'example w-40 h-40 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center transform'
                                }
                                key={index}
                            >
                                <div
                                    style={{pointerEvents: 'none'}}
                                    className={
                                        'example__mask h-2/5 w-full absolute bottom-0 z-10 flex items-center p-3 text-white font-bold'
                                    }
                                >
                                    {example.name}
                                </div>
                                <div
                                    className={'transform scale-50'}
                                    key={index}
                                    onClick={() => {
                                        const id = cryptoRandomString({length: 16});

                                        insertChart({type, id, initialState: example.state});
                                        // setApp((app) => ({
                                        //     ...app,
                                        //     activeKey: id,
                                        //     charts: [...app.charts,],
                                        // }));
                                    }}
                                >
                                    {getChart(type, example.state)}
                                </div>
                            </div>
                        ))}
                </div>
            }
        >
            <button
                aria-label={'Insert chart'}
                // size={'xs'}
                className={`w-7 h-7 flex justify-center items-center rounded-lg transition-all duration-200 hover:bg-gray-100 active:bg-gray-200`}
                onClick={() => {
                    const id = cryptoRandomString({length: 16});
                    addChart(id);
                    insertChart({type, id});

                    // setApp((app) => ({
                    //     ...app,
                    //     activeKey: id,
                    //     charts: [...app.charts, { type, id }],
                    // }));
                }}
            >
                {children}
            </button>
        </Popover>
    );
}

export function ChartTypeList({
    className,
    tooltipPlacement,
}: {
    className?: string;
    tooltipPlacement: PopoverProps['placement'];
}) {
    return (
        <div className={classnames('ChartTypeList flex gap-1', className)}>
            <ChartType type={'bar'} placement={tooltipPlacement}>
                <FcBarChart size={16} />
            </ChartType>
            <ChartType type={'line'} placement={tooltipPlacement}>
                <FcLineChart size={16} />
            </ChartType>
            <ChartType type={'pie'} placement={tooltipPlacement}>
                <FcPieChart size={16} />
            </ChartType>
            <ChartType type={'scatter'} placement={tooltipPlacement}>
                <FcScatterPlot size={16} />
            </ChartType>
            <ChartType type={'radar'} placement={tooltipPlacement}>
                <FcRadarPlot size={16} />
            </ChartType>
            <ChartType type={'calendar'} placement={tooltipPlacement}>
                <FcCalendar size={16} />
            </ChartType>
        </div>
    );
}
