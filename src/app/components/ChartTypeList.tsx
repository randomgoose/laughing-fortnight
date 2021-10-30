import {Tooltip} from 'antd';
import cryptoRandomString from 'crypto-random-string';
import {useAtom} from 'jotai';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {FcBarChart, FcLineChart, FcPieChart} from 'react-icons/fc';
import {appAtom} from '../atoms/appAtom';
import classnames from 'classnames';

export function ChartType({type, children}: {type?: 'line' | 'bar' | 'pie'; children?: React.ReactNode}) {
    const {t} = useTranslation();
    const [, setApp] = useAtom(appAtom);

    return (
        <Tooltip title={t(type[0].toUpperCase() + type.slice(1))} placement={'right'}>
            <button
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
        </Tooltip>
    );
}

export function ChartTypeList({className}: {className?: string}) {
    return (
        <div className={classnames('ChartTypeList flex gap-1', className)}>
            <ChartType type={'bar'}>
                <FcBarChart size={16} />
            </ChartType>
            <ChartType type={'line'}>
                <FcLineChart size={16} />
            </ChartType>
            <ChartType type={'pie'}>
                <FcPieChart size={16} />
            </ChartType>
        </div>
    );
}
