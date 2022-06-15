import {Popover, PopoverProps} from 'antd';
import cryptoRandomString from 'crypto-random-string';
import {useAtom} from 'jotai';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {FcBarChart, FcCalendar, FcLineChart, FcPieChart, FcRadarPlot, FcScatterPlot} from 'react-icons/fc';
import {addChartAtom} from '../atoms/appAtom';
import classnames from 'classnames';
import {Pie} from '@nivo/pie';
import {initialPieState} from '../atoms/pieAtomFamily';
import {examples, IExample} from '../examples';
import {Line} from '@nivo/line';
import {initialLineState} from '../atoms/lineAtomFamily';
import {Bar} from '@nivo/bar';
import {initialBarState} from '../atoms/barAtomFamily';
import {Radar} from '@nivo/radar';
import {ChartType} from '../../types';

function getChart(type: ChartType, state: any) {
    switch (type) {
        case 'PIE':
            return <Pie {...{...initialPieState, ...state}} isInteractive={false} />;
        case 'LINE':
            return <Line {...{...initialLineState, ...state}} isInteractive={false} />;
        case 'BAR':
            return <Bar {...{...initialBarState, ...state}} isInteractive={false} animate={false} />;
        case 'RADAR':
            return <Radar {...{...initialBarState, ...state}} isInteractive={false} />;
        default:
            return <Pie {...{...initialPieState, ...state}} isInteractive={false} />;
    }
}

export function ChartTypeButton({
    type,
    children,
    placement,
}: {
    type: ChartType;
    children?: React.ReactNode;
    placement?: PopoverProps['placement'];
}) {
    const {t} = useTranslation();
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
                                    // setApp((app) => ({
                                    //     ...app,
                                    //     activeKey: id,
                                    //     charts: [...app.charts,],
                                    // }));
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
                    addChart({type, id});
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
            <ChartTypeButton type={'BAR'} placement={tooltipPlacement}>
                <FcBarChart size={16} />
            </ChartTypeButton>
            <ChartTypeButton type={'LINE'} placement={tooltipPlacement}>
                <FcLineChart size={16} />
            </ChartTypeButton>
            <ChartTypeButton type={'PIE'} placement={tooltipPlacement}>
                <FcPieChart size={16} />
            </ChartTypeButton>
            <ChartTypeButton type={'SCATTER'} placement={tooltipPlacement}>
                <FcScatterPlot size={16} />
            </ChartTypeButton>
            <ChartTypeButton type={'RADAR'} placement={tooltipPlacement}>
                <FcRadarPlot size={16} />
            </ChartTypeButton>
            <ChartTypeButton type={'CALENDAR'} placement={tooltipPlacement}>
                <FcCalendar size={16} />
            </ChartTypeButton>
        </div>
    );
}
