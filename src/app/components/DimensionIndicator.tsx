import * as React from 'react';
import {CSSProperties} from 'react';

interface Props {
    width: number;
    height: number;
    style?: CSSProperties;
}

export default function DimensionIndicator({width, height, style}: Props) {
    return (
        <div style={style}>
            <span style={{marginRight: 8}}>宽：{width}</span>
            <span>高：{height}</span>
        </div>
    );
}
