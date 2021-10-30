import * as React from 'react';
import {CSSProperties} from 'react';

interface Props {
    width: number | string;
    height: number | string;
    style?: CSSProperties;
}

export default function DimensionIndicator({width, height}: Props) {
    return (
        <div className={'DimensionIndicator absolute -bottom-5 left-0 bg-blue-600 text-white px-2'}>
            {parseFloat(width.toString())} x {parseFloat(height.toString())}
        </div>
    );
}
