import {Popover, PopoverProps} from 'antd';
import cryptoRandomString from 'crypto-random-string';
import {useAtom} from 'jotai';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {FcBarChart, FcLineChart, FcPieChart, FcScatterPlot} from 'react-icons/fc';
import {appAtom, ChartType as Type} from '../atoms/appAtom';
import classnames from 'classnames';

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
    const [, setApp] = useAtom(appAtom);

    return (
        <Popover
            title={t(type[0].toUpperCase() + type.slice(1))}
            placement={placement}
            content={
                <div className={'grid grid-cols-3 gap-2 max-h-44 overflow-scroll'}>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                    <div className={'w-40 h-40 bg-gray-100 rounded-md'}></div>
                </div>
            }
        >
            <button
                aria-label={'Insert chart'}
                // size={'xs'}
                className={`w-7 h-7 flex justify-center items-center rounded-lg transition-all duration-200 hover:bg-gray-100 active:bg-gray-200`}
                onClick={() => {
                    const id = cryptoRandomString({length: 16});
                    setApp((app) => ({
                        ...app,
                        activeKey: id,
                        charts: [...app.charts, {type, id}],
                    }));
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
        </div>
    );
}
