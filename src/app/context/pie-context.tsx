import * as React from 'react';
import {DefaultRawDatum, PieSvgProps} from '@nivo/pie';
import {createContext} from 'react';
import {data} from '../data/basePieData';

export interface IPieConfigProvider {
    children: React.ReactNode;
}

export const pieConfig: PieSvgProps<DefaultRawDatum> = {
    data,
    width: 400,
    height: 300,
    margin: {top: 40, right: 80, bottom: 80, left: 80},
};

const PieContext = createContext<{
    state: PieSvgProps<DefaultRawDatum>;
    dispatch: React.Dispatch<any>;
}>({state: pieConfig, dispatch: () => null});

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PARTIAL_STATE':
            return {...state, data: []};
    }
};

const PieConfigProvider = ({children}: IPieConfigProvider) => {
    const [state, dispatch] = React.useReducer(reducer, pieConfig);
    let value = {state, dispatch};

    return <PieContext.Provider value={value}>{children}</PieContext.Provider>;
};

export {PieContext, PieConfigProvider};
